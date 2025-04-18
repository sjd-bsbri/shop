import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data';
import formatCurrency from './Util';
import '../product-detail.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  // Product specifications based on product ID
  const getProductSpecs = (productId) => {
    const specs = {
      1: { // مک بوک ایر
        color: "نقره‌ای",
        ram: "8 گیگابایت",
        storage: "256 گیگابایت SSD",
        gpu: "Apple M1",
        display: "Retina 13.3 اینچ، 2560 × 1600",
        refreshRate: "60 هرتز",
        features: "Touch ID، باتری 18 ساعته، وای‌فای 6",
        keyboard: "بک‌لایت با سنسور نور محیطی",
        bluetooth: "نسخه 5.0",
        madeIn: "چین"
      },
      2: { // لپ تاپ ایسوس
        color: "مشکی",
        ram: "8 گیگابایت",
        storage: "512 گیگابایت SSD",
        gpu: "NVIDIA GeForce GTX 1650",
        display: "15.6 اینچ، Full HD 1920 × 1080",
        refreshRate: "144 هرتز",
        features: "سیستم خنک‌کننده پیشرفته، کیبورد با نورپردازی RGB",
        keyboard: "RGB با قابلیت تنظیم رنگ‌های مختلف",
        bluetooth: "نسخه 5.1",
        madeIn: "تایوان"
      },
      3: { // لپ تاپ اچ پی
        color: "نقره‌ای",
        ram: "16 گیگابایت",
        storage: "1 ترابایت SSD",
        gpu: "Intel Iris Xe Graphics",
        display: "14 اینچ، Full HD 1920 × 1080",
        refreshRate: "60 هرتز",
        features: "طراحی باریک و سبک، باتری طولانی مدت",
        keyboard: "بک‌لایت سفید",
        bluetooth: "نسخه 5.0",
        madeIn: "چین"
      },
      4: { // لپ تاپ ایسوس
        color: "آبی تیره",
        ram: "16 گیگابایت",
        storage: "1 ترابایت SSD",
        gpu: "NVIDIA GeForce RTX 3050",
        display: "17.3 اینچ، Full HD 1920 × 1080",
        refreshRate: "165 هرتز",
        features: "سیستم صوتی قدرتمند، سیستم خنک‌کننده دوگانه",
        keyboard: "RGB با 4 منطقه قابل تنظیم",
        bluetooth: "نسخه 5.2",
        madeIn: "تایوان"
      },
      5: { // لپ تاپ ام اس آی
        color: "مشکی",
        ram: "32 گیگابایت",
        storage: "1 ترابایت SSD NVMe",
        gpu: "NVIDIA GeForce RTX 3070",
        display: "15.6 اینچ، QHD 2560 × 1440",
        refreshRate: "240 هرتز",
        features: "سیستم خنک‌کننده Cooler Boost 5، طراحی مخصوص گیمینگ",
        keyboard: "SteelSeries RGB با قابلیت تنظیم هر کلید",
        bluetooth: "نسخه 5.2",
        madeIn: "چین"
      },
      6: { // لپ تاپ اپل
        color: "خاکستری",
        ram: "16 گیگابایت",
        storage: "512 گیگابایت SSD",
        gpu: "Apple M2",
        display: "14 اینچ، Liquid Retina XDR، 3024 × 1964",
        refreshRate: "120 هرتز با ProMotion",
        features: "Touch Bar، Touch ID، پورت‌های Thunderbolt 4",
        keyboard: "Magic Keyboard با بک‌لایت",
        bluetooth: "نسخه 5.3",
        madeIn: "چین"
      }
    };
    
    return specs[productId] || {
      color: "نامشخص",
      ram: "نامشخص",
      storage: "نامشخص",
      gpu: "نامشخص",
      display: "نامشخص",
      refreshRate: "نامشخص",
      features: "نامشخص",
      keyboard: "نامشخص",
      bluetooth: "نامشخص",
      madeIn: "نامشخص"
    };
  };

  if (!product) {
    return <div className="loading">در حال بارگذاری...</div>;
  }

  const specs = getProductSpecs(product.id);

  return (
    <div className="product-detail-container">
      <Link to="/" className="back-button">
        <i className="fa fa-arrow-right"></i> بازگشت به فروشگاه
      </Link>
      
      <div className="product-detail-card">
        <h1 className="product-title">{product.title}</h1>
        
        <div className="product-info">
          <div className="product-left-column">
            <div className="product-price">
              <h3>قیمت:</h3>
              <span>{formatCurrency(product.price)}</span>
            </div>
            <div className="product-color">
              <h3>رنگ:</h3>
              <span>{specs.color}</span>
            </div>
          </div>
          
          <div className="product-right-column">
            <img src={product.image} alt={product.title} className="product-image" />
          </div>
        </div>
        
        <div className="product-specifications">
          <h2>مشخصات محصول</h2>
          
          <div className="specs-grid">
            <div className="spec-item">
              <h3>ظرفیت حافظه رم:</h3>
              <span>{specs.ram}</span>
            </div>
            
            <div className="spec-item">
              <h3>ظرفیت حافظه داخلی:</h3>
              <span>{specs.storage}</span>
            </div>
            
            <div className="spec-item">
              <h3>سازنده پردازنده گرافیکی:</h3>
              <span>{specs.gpu}</span>
            </div>
            
            <div className="spec-item">
              <h3>دقت صفحه نمایش:</h3>
              <span>{specs.display}</span>
            </div>
            
            <div className="spec-item">
              <h3>نرخ بروزرسانی تصویر:</h3>
              <span>{specs.refreshRate}</span>
            </div>
            
            <div className="spec-item">
              <h3>قابلیت های دستگاه:</h3>
              <span>{specs.features}</span>
            </div>
            
            <div className="spec-item">
              <h3>نورپردازی صفحه کلید:</h3>
              <span>{specs.keyboard}</span>
            </div>
            
            <div className="spec-item">
              <h3>نسخه بلوتوث:</h3>
              <span>{specs.bluetooth}</span>
            </div>
            
            <div className="spec-item">
              <h3>کشور سازنده:</h3>
              <span>{specs.madeIn}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;