// تأكد من أن الملف يبدأ بـ 'use client' إذا كنت تستخدم Next.js App Router
// هذا يسمح بالتفاعل (مثل الأزرار والمربعات) في المستقبل.
"use client";

// هذا المكون هو صفحة الهبوط الكاملة
export default function HomePage() {
  return (
    // استخدام Flexbox و Tailwind CSS لتنظيم الصفحة بشكل جميل
    <div dir="rtl" className="min-h-screen bg-[#f4f7f6] text-gray-800 antialiased font-['Cairo',_sans-serif]">
      
      {/* رأس الصفحة (Header) */}
      <header className="bg-[#0d1a2c] text-white p-6 shadow-lg text-center">
        <h1 className="text-4xl font-extrabold mb-1">Dimaq AI</h1>
        <p className="text-lg">محرك الإبداع العربي المتكامل المدعوم بالذكاء الاصطناعي</p>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="container mx-auto p-6 md:p-12">
        
        {/* قسم الأبطال (Hero Section) - رسالة الجذب الرئيسية */}
        <section className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#e6b31e] leading-tight">
            وداعاً للنتائج المملة! مرحباً بعصر الإبداع الدقيق.
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            منصتنا الجديدة، المستندة إلى "دليل الأوامر الذهبية"، تضمن لك جودة إخراج فنية لا مثيل لها في كل مرة.
          </p>
        </section>

        {/* قسم المميزات (Features) - ما يقدمه المحرك */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* صندوق الميزة 1 */}
          <div className="bg-white p-6 rounded-xl shadow-2xl transition duration-300 hover:shadow-3xl hover:border-b-4 hover:border-[#e6b31e] border border-gray-100">
            <h3 className="text-2xl font-bold mb-3 text-[#0d1a2c] border-b-2 border-[#e6b31e] pb-2">
              <span role="img" aria-label="Brain">🧠</span> محرك الأوامر الذهبية
            </h3>
            <p className="text-gray-700 mt-4">
              **توفير الوقت:** أوامر مصقولة ومختبرة مسبقاً للحصول على صور احترافية فوراً. فقط انسخ والصق.
            </p>
          </div>
          
          {/* صندوق الميزة 2 */}
          <div className="bg-white p-6 rounded-xl shadow-2xl transition duration-300 hover:shadow-3xl hover:border-b-4 hover:border-[#e6b31e] border border-gray-100">
            <h3 className="text-2xl font-bold mb-3 text-[#0d1a2c] border-b-2 border-[#e6b31e] pb-2">
              <span role="img" aria-label="Crystal Ball">✨</span> تقنية الوضوح الفائق
            </h3>
            <p className="text-gray-700 mt-4">
              **جودة عالية:** صورك لن تكون ضبابية أبداً. تفاصيل دقيقة، وإضاءة سينمائية، وواقعية مفرطة مضمونة.
            </p>
          </div>
          
          {/* صندوق الميزة 3 */}
          <div className="bg-white p-6 rounded-xl shadow-2xl transition duration-300 hover:shadow-3xl hover:border-b-4 hover:border-[#e6b31e] border border-gray-100">
            <h3 className="text-2xl font-bold mb-3 text-[#0d1a2c] border-b-2 border-[#e6b31e] pb-2">
              <span role="img" aria-label="Book">📜</span> دعم الأنماط العربية
            </h3>
            <p className="text-gray-700 mt-4">
              **تنويع الإبداع:** محركنا يفهم الفروقات الدقيقة في الثقافة والتفاصيل العربية بدقة.
            </p>
          </div>
        </section>

        {/* دعوة للعمل (Call to Action) */}
        <section className="text-center">
          <div className="flex flex-col md:flex-row justify-center gap-6">
            
            {/* الزر الرئيسي */}
            <a href="#" className="inline-block px-10 py-4 text-xl font-bold rounded-lg shadow-xl bg-[#e6b31e] text-[#0d1a2c] transition duration-300 hover:bg-[#f0c330]">
              ابدأ استخدام البوت الآن 🚀
            </a>
            
            {/* الزر الثانوي */}
            <a href="#" className="inline-block px-10 py-4 text-xl font-bold rounded-lg shadow-xl bg-gray-700 text-white transition duration-300 hover:bg-gray-800">
              احصل على "دليل الأوامر الذهبية" كاملاً
            </a>
          </div>
        </section>
      </main>

      {/* التذييل (Footer) */}
      <footer className="bg-[#0d1a2c] text-gray-500 p-4 text-center text-sm mt-10">
        <p>&copy; 2025 Dimaq AI. كل الحقوق محفوظة. نعمل على تطبيق الجوال قريباً!</p>
      </footer>
    </div>
  );
}
