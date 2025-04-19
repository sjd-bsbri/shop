import React from 'react';

function About() {
  return (
    <div className="about-container">
      {/* Title Section */}
      <div className="about-section title-section">
        <h1>درباره ما</h1>
        <div className="section-divider"></div>
      </div>

      {/* Business Introduction Section */}
      <div className="about-section">
        <h2>معرفی کسب و کار</h2>
        <p>
          فروشگاه ما با بیش از ۱۰ سال سابقه در ارائه بهترین لپ‌تاپ‌ها و محصولات کامپیوتری، 
          همواره تلاش کرده است تا با ارائه محصولات با کیفیت و خدمات پس از فروش عالی، 
          رضایت مشتریان را جلب کند. ما به عنوان یکی از پیشگامان فروش آنلاین تجهیزات کامپیوتری در کشور، 
          همواره به دنبال ارائه به‌روزترین محصولات با قیمت‌های رقابتی هستیم.
        </p>
      </div>

      {/* Expertise and Differentiation Section */}
      <div className="about-section">
        <h2>تخصص و تمایز ما</h2>
        <div className="expertise-container">
          <div className="expertise-item">
            <i className="fas fa-award"></i>
            <h3>کیفیت برتر</h3>
            <p>تمامی محصولات ما دارای گارانتی اصالت و سلامت کالا هستند</p>
          </div>
          <div className="expertise-item">
            <i className="fas fa-shipping-fast"></i>
            <h3>ارسال سریع</h3>
            <p>ارسال محصولات در کوتاه‌ترین زمان ممکن به سراسر کشور</p>
          </div>
          <div className="expertise-item">
            <i className="fas fa-headset"></i>
            <h3>پشتیبانی ۲۴/۷</h3>
            <p>تیم پشتیبانی ما همواره آماده پاسخگویی به سوالات شما است</p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="about-section">
        <h2>ارزش‌های ما</h2>
        <div className="values-container">
          <div className="value-item">
            <h3>صداقت</h3>
            <p>ارائه اطلاعات دقیق و شفاف درباره محصولات و خدمات</p>
          </div>
          <div className="value-item">
            <h3>مشتری‌مداری</h3>
            <p>اولویت اصلی ما رضایت مشتریان و ارائه بهترین تجربه خرید است</p>
          </div>
          <div className="value-item">
            <h3>نوآوری</h3>
            <p>همگام با تکنولوژی‌های روز دنیا و ارائه محصولات پیشرفته</p>
          </div>
          <div className="value-item">
            <h3>مسئولیت اجتماعی</h3>
            <p>تعهد به حفظ محیط زیست و مسئولیت‌پذیری اجتماعی</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;