import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
    // Initialize Supabase client inside function to avoid build-time errors
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || ''

    try {
        console.log('--- STARTING VIDEO SYNC ---')

        // 1. Get videos that need syncing
        // Fetch ALL videos to ensure we update everything for debugging
        const { data: videosToSync, error: dbError } = await supabase
            .from('youtube_video')
            .select('video_id')

        if (dbError) {
            console.error('Supabase select error:', dbError)
            throw dbError
        }

        console.log('Videos found in DB:', videosToSync)

        if (!videosToSync || videosToSync.length === 0) {
            console.log('No videos found in DB to sync.')
            return NextResponse.json({ message: 'No videos to sync' })
        }

        // Map clean ID -> Original ID(s)
        const idMap = new Map<string, string>();
        const cleanVideoIds = videosToSync.map(v => {
            // Clean ID: remove query params like ?t=... or &t=...
            const clean = v.video_id.split('&')[0].split('?')[0];
            idMap.set(clean, v.video_id);
            return clean;
        })

        // Remove duplicates for API call
        const uniqueCleanIds = [...new Set(cleanVideoIds)];
        const videoIdsParam = uniqueCleanIds.join(',')
        console.log('Cleaned IDs to send to YouTube:', videoIdsParam)

        // 2. Call YouTube API
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIdsParam}&key=${YOUTUBE_API_KEY}`
        console.log('Calling YouTube API URL:', apiUrl)

        const youtubeResponse = await fetch(apiUrl)
        const youtubeData = await youtubeResponse.json()

        if (youtubeData.error) {
            console.error('YouTube API Error Response:', youtubeData.error)
            return NextResponse.json({ error: 'YouTube API Error', details: youtubeData.error }, { status: 400 })
        }

        if (!youtubeData.items) {
            console.error('No items returned from YouTube. Raw data:', youtubeData)
            throw new Error('Failed to fetch data from YouTube (no items)')
        }

        console.log(`YouTube returned ${youtubeData.items.length} items.`)

        // 3. Update Database
        let successCount = 0;
        let failCount = 0;

        for (const item of youtubeData.items) {
            const cleanId = item.id;
            const originalId = idMap.get(cleanId);

            console.log(`Processing YouTube Item: ${cleanId} (Original DB ID: ${originalId})`)

            if (!originalId) {
                console.warn(`Could not find original ID for returned video ${cleanId} in map. Map keys:`, [...idMap.keys()])
                continue;
            }

            const updatePayload = {
                video_id: cleanId, // Update to clean ID to fix future issues
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail_url: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
                duration: item.contentDetails.duration,
                view_count: parseInt(item.statistics.viewCount || '0'),
                fetched_at: new Date().toISOString()
            };

            const { error: updateError } = await supabase
                .from('youtube_video')
                .update(updatePayload)
                .eq('video_id', originalId)

            if (updateError) {
                console.error(`Failed to update video ${originalId}:`, updateError)
                failCount++;
            } else {
                console.log(`Successfully updated video ${originalId} -> ${cleanId}`)
                successCount++;
            }
        }

        console.log(`--- SYNC COMPLETED. Success: ${successCount}, Fail: ${failCount} ---`)

        return NextResponse.json({
            message: 'Sync successful',
            synced_count: successCount,
            failed_count: failCount,
            total_found: youtubeData.items.length
        })

    } catch (error: any) {
        console.error('Sync CRITICAL error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
