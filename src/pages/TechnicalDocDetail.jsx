import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Breadcrumb, Card } from 'react-bootstrap';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Section } from '../components/ui';
import { getTechnicalDocById, getTechnicalDocs } from '../data/technicalDocs';

function TechnicalDocDetail() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [relatedDocs, setRelatedDocs] = useState([]);

  useEffect(() => {
    // Get the document based on the ID from the URL
    const docId = parseInt(id);
    const currentDoc = getTechnicalDocById(docId);
    
    if (currentDoc) {
      setDoc(currentDoc);
      
      // Get related documents (excluding the current one)
      const related = getTechnicalDocs(4).filter(item => item.id !== docId);
      setRelatedDocs(related);
    }
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [id]);

  if (!doc) {
    return (
      <>
        <Header />
        <Container className="py-5">
          <h2>Không tìm thấy tài liệu</h2>
          <Link to="/tai-lieu-ky-thuat" className="btn btn-primary mt-3">
            Quay lại danh sách
          </Link>
        </Container>
        <Footer />
      </>
    );
  }

  // Check if doc has detailed content
  const hasDetailedContent = doc.content && doc.content.sections;

  return (
    <>
      <Header />
      <Container className="py-4">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-3">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/tai-lieu-ky-thuat" }}>
            Tài liệu kỹ thuật
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{doc.title}</Breadcrumb.Item>
        </Breadcrumb>

        <Row>
          {/* Main Content */}
          <Col lg={8}>
            <article className="technical-doc-article">
              <h1 className="article-title mb-3">{doc.title}</h1>
              
              <div className="article-meta mb-3">
                <span className="article-date">Ngày đăng: {doc.publishDate || '10/06/2023'}</span>
                <span className="mx-2">|</span>
                <span className="article-author">Tác giả: {doc.author || 'Nhóm kỹ thuật'}</span>
              </div>
              
              <div className="article-featured-image mb-4">
                <img 
                  src={doc.image} 
                  alt={doc.title} 
                  className="img-fluid rounded"
                />
              </div>
              
              <div className="article-content">
                {hasDetailedContent ? (
                  <>
                    <p className="lead">{doc.content.overview}</p>
                    
                    {doc.content.sections.map((section, index) => (
                      <div key={index} className="mb-4">
                        <h2>{section.title}</h2>
                        <div dangerouslySetInnerHTML={{ 
                          __html: section.content.replace(/\n/g, '<br />') 
                        }} />
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <p className="lead">{doc.description}</p>
                    
                    <p>Hướng dẫn chi tiết về {doc.title.toLowerCase()} giúp bạn nâng cao hiệu quả trong việc chăm sóc cây trồng. Chúng tôi sẽ cung cấp các thông tin về cách thức áp dụng, những lưu ý quan trọng và các kỹ thuật tiên tiến.</p>
                    
                    <h2>1. Tổng quan</h2>
                    <p>Việc {doc.title.toLowerCase()} là một phần quan trọng trong quy trình canh tác hiện đại. Kỹ thuật này được áp dụng rộng rãi ở nhiều nước trên thế giới và đang dần phổ biến tại Việt Nam.</p>
                    
                    <h2>2. Nguyên tắc cơ bản</h2>
                    <p>Để thực hiện đúng kỹ thuật, bạn cần tuân thủ các nguyên tắc sau:</p>
                    <ul>
                      <li>Lựa chọn thời điểm thích hợp</li>
                      <li>Chuẩn bị đầy đủ dụng cụ và vật tư</li>
                      <li>Tuân thủ quy trình kỹ thuật</li>
                      <li>Theo dõi thường xuyên và điều chỉnh kịp thời</li>
                    </ul>
                    
                    <h2>3. Các bước thực hiện</h2>
                    <p>Quy trình thực hiện được chia thành các bước sau:</p>
                    <ol>
                      <li>
                        <strong>Bước 1: Chuẩn bị</strong>
                        <p>Chuẩn bị đầy đủ các dụng cụ và vật tư cần thiết. Đảm bảo khu vực làm việc sạch sẽ và đầy đủ ánh sáng.</p>
                      </li>
                      <li>
                        <strong>Bước 2: Thực hiện</strong>
                        <p>Tiến hành theo đúng quy trình kỹ thuật, chú ý các thông số về nhiệt độ, độ ẩm và ánh sáng.</p>
                      </li>
                      <li>
                        <strong>Bước 3: Theo dõi</strong>
                        <p>Theo dõi định kỳ và ghi chép các thay đổi để kịp thời điều chỉnh.</p>
                      </li>
                      <li>
                        <strong>Bước 4: Đánh giá kết quả</strong>
                        <p>Đánh giá hiệu quả sau một thời gian áp dụng và rút kinh nghiệm.</p>
                      </li>
                    </ol>
                    
                    <h2>4. Lưu ý quan trọng</h2>
                    <p>Khi thực hiện kỹ thuật này, bạn cần chú ý một số điểm sau:</p>
                    <ul>
                      <li>Không áp dụng trong điều kiện thời tiết xấu</li>
                      <li>Tuân thủ nghiêm ngặt liều lượng (nếu sử dụng hóa chất)</li>
                      <li>Sử dụng trang bị bảo hộ cần thiết</li>
                      <li>Không kết hợp với các kỹ thuật không tương thích</li>
                    </ul>
                    
                    <h2>5. Kết luận</h2>
                    <p>Việc áp dụng đúng kỹ thuật {doc.title.toLowerCase()} sẽ giúp nâng cao năng suất và chất lượng cây trồng, đồng thời giảm thiểu rủi ro và chi phí sản xuất.</p>
                  </>
                )}
              </div>
            </article>
          </Col>
          
          {/* Sidebar with Related Articles */}
          <Col lg={4}>
            <aside className="technical-doc-sidebar">
              <h3 className="mb-3">Tài liệu liên quan</h3>
              {relatedDocs.map(relatedDoc => (
                <Card key={relatedDoc.id} className="mb-3 technical-doc-card">
                  <Card.Img variant="top" src={relatedDoc.image} alt={relatedDoc.title} />
                  <Card.Body>
                    <Card.Title className="doc-title">{relatedDoc.title}</Card.Title>
                    <Card.Text className="small doc-description">{relatedDoc.description}</Card.Text>
                    <Link 
                      to={`/tai-lieu-ky-thuat/${relatedDoc.id}`} 
                      className="stretched-link"
                      aria-label={`Xem chi tiết ${relatedDoc.title}`}
                    ></Link>
                  </Card.Body>
                </Card>
              ))}
            </aside>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default TechnicalDocDetail; 