import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faMapMarkerAlt, 
  faHeadset,
  faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import { 
  faTwitter, 
  faFacebook, 
  faInstagram, 
  faTelegram, 
  faWhatsapp 
} from "@fortawesome/free-brands-svg-icons";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: "لطفاً تمامی فیلدهای ضروری را پر کنید."
      });
      return;
    }
    
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: "پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت."
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: ""
        });
      }, 5000);
    }, 1000);
  };

  return (
    <div className="contact-container">
      <div className="title-section">
        <h1>تماس با ما</h1>
        <div className="section-divider"></div>
      </div>
      
      <div className="contact-info-container">
        <div className="contact-info-item">
          <div className="icon">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </div>
          <div className="content">
            <h3>آدرس ما</h3>
            <p>مشهد، خیابان مجد، پلاک ۱۰، طبقه ۳</p>
            <p className="description">آدرس دفتر مرکزی ما که می‌توانید برای مراجعه حضوری مراجعه کنید.</p>
          </div>
        </div>
        
        <div className="contact-info-item">
          <div className="icon">
            <FontAwesomeIcon icon={faHeadset} />
          </div>
          <div className="content">
            <h3>پشتیبانی فنی</h3>
            <p>۰۵۱-۸۸۷۷۶۶۵۵</p>
            <p className="description">تیم پشتیبانی فنی ما آماده پاسخگویی به سوالات فنی شما هستند.</p>
          </div>
        </div>
        
        <div className="contact-info-item">
          <div className="icon">
            <FontAwesomeIcon icon={faShoppingCart} />
          </div>
          <div className="content">
            <h3>واحد فروش</h3>
            <p>۰۵۱-۸۸۱۱۲۲۳۳</p>
            <p className="description">برای سفارش و اطلاع از قیمت‌ها با واحد فروش تماس بگیرید.</p>
          </div>
        </div>
        
        
      </div>
      
      <div className="contact-main-container">
        <div className="contact-form-section">
          <h2>فرم تماس با ما</h2>
          <p>لطفا فرم زیر را تکمیل کنید. کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.</p>
          
          {formStatus.submitted && (
            <div className={`form-message ${formStatus.success ? 'success' : 'error'}`}>
              {formStatus.message}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">نام و نام خانوادگی *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">ایمیل *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">موضوع</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">پیام *</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">ارسال پیام</button>
          </form>
        </div>
        
        <div className="social-media-section">
          <h2>ما را در شبکه‌های اجتماعی دنبال کنید</h2>
          <p>برای اطلاع از آخرین محصولات، تخفیف‌ها و اخبار ما را در شبکه‌های اجتماعی دنبال کنید.</p>
          
          <div className="social-links">
            <a href="" className="social-link instagram">
              <FontAwesomeIcon icon={faInstagram} />
              <span>اینستاگرام</span>
            </a>
            
            <a href="" className="social-link telegram">
              <FontAwesomeIcon icon={faTelegram} />
              <span>تلگرام</span>
            </a>
            
            <a href="" className="social-link twitter">
              <FontAwesomeIcon icon={faTwitter} />
              <span>توییتر</span>
            </a>
            
            <a href="" className="social-link facebook">
              <FontAwesomeIcon icon={faFacebook} />
              <span>فیسبوک</span>
            </a>
            
            <a href="" className="social-link whatsapp">
              <FontAwesomeIcon icon={faWhatsapp} />
              <span>واتساپ</span>
            </a>
          </div>
        </div>
      </div>
      
     
    </div>
  );
}

export default Contact; 