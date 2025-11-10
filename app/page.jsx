"use client";

import { useState } from 'react';

// هذا المكون هو صفحة الهبوط الكاملة التي تتفاعل مع المستخدم
export default function HomePage() {
  const [idea, setIdea] = useState(''); // لتخزين فكرة المستخدم
  const [result, setResult] = useState(null); // لتخزين نتائج الذكاء الاصطناعي
  const [loading, setLoading] = useState(false); // لحالة التحميل
  const [error, setError] = useState(null); // لتخزين رسائل الخطأ

  // دالة الإرسال إلى محرك الذكاء الاصطناعي (API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idea.trim()) {
      setError("الرجاء إدخال فكرة تصميم.");
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || "فشل في التواصل مع محرك الذكاء الاصطناعي.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("حدث خطأ غير متوقع في الاتصال بالخادم.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#f4f7f6] text-gray-800 antialiased font-['Cairo',_sans-serif]">
      {/* Header, Footer, and basic layout structure are assumed to be in layout.js or global styles */}

      <main className="container mx-auto p-6 md:p-12">
        
        {/* قسم الأبطال (Hero Section) */}
        <section className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#e6b31e] leading-tight">
            وداعاً للنتائج المملة! مرحباً بعصر الإبداع الدقيق.
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            منصتنا الجديدة، المستندة إلى "دليل الأوامر الذهبية"، تضمن لك جودة إخراج فنية لا مثيل لها في كل مرة.
          </p>
        </section>

        {/* قسم الإدخال والتفاعل */}
        <section className="bg-white p-8 rounded-xl shadow-2xl max-w-4xl mx-auto mb-16">
            <h3 className="text-3xl font-bold mb-6 text-[#0d1a2c] text-center">صف فكرتك باللغة العربية:</h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                <textarea
                    className="flex-grow p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-[#e6b31e]/50 focus:border-[#e6b31e] resize-none"
                    rows="4"
                    placeholder="مثال: إعلان عن منتج جديد لعطور فاخرة مستوحاة من الصحراء."
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    disabled={loading}
                />
                <button
                    type="submit"
                    className={`px-8 py-4 text-xl font-bold rounded-lg shadow-xl transition duration-300 ${
                        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#e6b31e] text-[#0d1a2c] hover:bg-[#f0c330]'
                    }`}
                    disabled={loading}
                >
                    {loading ? 'الذكاء الاصطناعي يعمل...' : 'توليد خطة التصميم 🚀'}
                </button>
            </form>

            {/* عرض حالة التحميل والخطأ */}
            {loading && <p className="text-center text-blue-600 mt-4">جاري تحليل الفكرة وصياغة الأوامر الذهبية...</p>}
            {error && <p className="text-center text-red-600 mt-4 font-bold">خطأ: {error}</p>}
        </section>

        {/* عرض النتائج */}
        {result && (
            <section className="mt-10">
                <h3 className="text-3xl font-bold text-[#0d1a2c] mb-6 text-center border-b-2 pb-2">نتائج محرك الإبداع:</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* صندوق النص التسويقي */}
                    <ResultBox 
                        title="✍️ النص التسويقي (Copy)"
                        content={`**${result.copywriting_title}**\n\n${result.copywriting_body}`}
                        color="#0d1a2c"
                    />
                    
                    {/* صندوق الأسلوب البصري */}
                    <ResultBox 
                        title="🎨 الأسلوب البصري المقترح"
                        content={result.visual_style}
                        color="#e6b31e"
                    />
                    
                    {/* صندوق أمر توليد الصورة */}
                    <ResultBox 
                        title="🖼️ الأمر الذهبي للصور (انجليزي)"
                        content={result.image_prompt}
                        color="#333"
                        isCode={true}
                    />
                </div>
            </section>
        )}

        {/* إضافة المكونات المساعدة */}
        {/* يمكنك نقل قسم المميزات هنا إذا أردت إظهارها أسفل النتائج */}
      </main>
      
      {/* تعريف مكون صندوق النتيجة لسهولة التنسيق */}
      <style jsx>{`
        .ResultBox {
          background-color: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
        }
        .ResultBox h4 {
          font-size: 1.5rem;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}

// مكون مساعد لعرض النتائج بشكل جذاب
const ResultBox = ({ title, content, color, isCode = false }) => (
    <div className="ResultBox border-t-4 p-6" style={{ borderColor: color }}>
        <h4 className="font-bold mb-3" style={{ color: color }}>{title}</h4>
        {isCode ? (
            <pre className="whitespace-pre-wrap bg-gray-100 p-3 rounded text-sm text-left direction-ltr font-mono">{content}</pre>
        ) : (
            <p className="whitespace-pre-wrap text-gray-700">{content}</p>
        )}
    </div>
);
