import React from 'react';
import './style.scss'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

function index(props) {
    return (
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted' style={{backgroundColor:'white'}}>
        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom' >
          <div className='me-5 d-none d-lg-block' style={{backgroundColor:'white'}}>
            <span>Kết nối với chúng tôi:</span>
          </div>
  
          <div >
            <a href='' className='me-4 text-reset'>
              <MDBIcon fab icon="facebook-f" />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon fab icon="twitter" />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon fab icon="google" />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon fab icon="instagram" />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon fab icon="linkedin" />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon fab icon="github" />
            </a>
          </div>
        </section>
  
        <section className='' >
          <MDBContainer className='text-center text-md-start mt-5' style={{backgroundColor:'white'}}>
            <MDBRow className='mt-3' >
              <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>
                  <MDBIcon icon="gem" className="me-3" />
                    ĐỒNG HỒ
                </h6>
                <p>Chúng tôi là shop bán đồng hồ chính hãng hàng đầu với nhiều năm kinh nghiệm trong lĩnh vực này. Chúng tôi cam kết mang đến những sản phẩm chất lượng nhất cho khách hàng của mình.</p>

              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
                <p>
                  <a href='#!' className='text-reset'>
                    Đồng hồ nữ
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Đồng hồ nam
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Đồng hồ thông minh
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Đồng hồ cơ
                  </a>
                </p>
              </MDBCol>
  
              
  
              <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                <p>
                  <MDBIcon icon="home" className="me-2" />
                  New York, NY 10012, US
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-3" />
                  info@example.com
                </p>
                <p>
                  <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
                </p>
                <p>
                  <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
  
        <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2021 Copyright:
          <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
            MDBootstrap.com
          </a>
        </div>
      </MDBFooter>
    );
}

export default index;