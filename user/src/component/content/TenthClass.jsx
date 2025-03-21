import React from 'react'
import FeeStructureTable from './Feestucture'
import HighSchoolSubjectsTable from './HeighSchoolTbale'
const TenthClass = () => {
  const eligibilityData = [
    { criteria: 'न्यूनतम आयु', details: 'कोई बंधन नहीं।' },
    { criteria: 'अधिकतम आयु', details: 'कोई बंधन नहीं।' },
    {
      criteria: ' संलग्न किये जाने वाले जन्मतिथि संबंधी प्रमाण पत्र',
      details: `	संलग्न किये जाने वाले जन्मतिथि संबंधी प्रमाण पत्र	निम्नलिखित से प्राप्त जन्मतिथि प्रमाण पत्र की प्रमाणित प्रति। अध्ययनरत अंतिम शाला का स्थानान्तरण प्रमाण-पत्र अथवा 5वींबोर्ड / 8वींबोर्ड /10वीं बोर्ड परीक्षा की मूल अंकसूची में दर्ज जन्मतिथि मान्य होगी। इस हेतु सत्यापित प्रति आवेदन पत्र के साथ संलग्न करें,अथवा ग्रामपंचायत / नगरपंचायत / नगर पालिका/नगर निगम के सक्षम अधिकारी द्वारा जारी जन्म प्रमाण-पत्र की सत्यापित प्रति फार्म के साथ संलग्न करें। जिन विद्यार्थियों ने किसी भी स्कूल में प्रवेश नहीं लिया है, और उनका जन्म 1989 के पूर्व हुआ है, उनको जन्मतिथि के प्रमाणीकरण हेतु शपथ पत्र प्रस्तुत करना होगा। जिसमें सही जन्मतिथि अंकित हो।
`,
    },
    { criteria: 'न्यूनतम शैक्षणिक योग्यता', details: 'कक्षा 8वीं उत्तीर्ण।' },
    {
      criteria: 'अ.जा./अ.ज.जा. छात्रों के लिए छूट',
      details: 'सक्षम प्राधिकारी द्वारा प्रदत्त जाति प्रमाण पत्र।',
    },
    {
      criteria: '40% या अधिक विकलांगता वाले छात्रों हेतु छूट',
      details: 'जिला चिकित्सा बोर्ड द्वारा प्रदत्त विकलांगता प्रमाण-पत्र।',
    },
    {
      criteria: 'बी.पी.एल. कार्डधारी छात्रों हेतु छूट',
      details:
        'जिला खाद्य नियंत्रक अधिकारी अथवा म.प्र. शासन द्वारा समय-समय पर प्राधिकृत सक्षम प्राधिकारी द्वारा प्रदत्त प्रमाण पत्र । ',
    },
  ]
  return (
    <div className="container mx-auto px-4 sm:px-12">
      <div className=" rounded-lg">
        <h3 className="text-lg sm:text-2xl font-semibold text-white text-center my-5 border-[#fd645b] border-x-4 bg-[#fd645b] pt-1 py-1 w-full">
          अर्हताएँ एवं आवश्यक दस्तावेज (कक्षा 10वीं){' '}
        </h3>
        <p className="text-center pb-5">
          एम.पी.एस.ओ.एस.ई.बी की परीक्षाओं में प्रवेश हेतु निम्नलिखित अर्हताएँ
          एवं दस्तावेजों की आवश्यकता होगी :-
        </p>
        <table className="w-full border-collapse border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">अर्हता</th>
              <th className="border border-gray-300 px-4 py-2">विवरण</th>
            </tr>
          </thead>
          <tbody>
            {eligibilityData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  {item.criteria}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="">
        <h2 className="text-lg sm:text-2xl font-semibold text-white text-center my-5 border-[#fd645b] border-x-4 bg-[#fd645b] pt-1 py-1 w-full">
          संचालित योजनाएँ
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  योजनाएँ
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  हाईस्कूल पाठ्यक्रम
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  सामान्य योजनान्तर्गत
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  1- जन्म प्रमाण पत्र की राजपत्रित अधिकारी द्वारा सत्यापित
                  प्रति।
                  <br />
                  2- यदि औपचारिक शिक्षा प्राप्त की हो तो स्थानांतरण प्रमाण
                  पत्र/अंतिम परीक्षा की मूल अंकसूची।
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  पूर्णक्रेडिट योजनान्तर्गत
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  - पूर्व मंडल की 10 वीं अनुत्तीर्ण की अंकसूची की मूलप्रति एवं
                  सत्यापित छायाप्रति ।
                </td>
              </tr>
              <tr className="">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  अंशतः क्रेडिट योजनान्तर्गत
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  - मा.शि.नं. द्वारा मान्य बोर्ड से 10 वी उत्तीर्ण होने पर बोर्ड
                  अंकसूची की सत्यापित प्रति ।
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  अंक / श्रेणीसुधार योजनान्तर्गत
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  - म.प्र. राज्य ओपन से 10 वीं उत्तीर्ण की मूल अंकसूची।
                </td>
              </tr>
              <tr className="">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  पुनप्रवेश योजना
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  - 9 अवसरों की समयावधि में भी उत्तीर्ण नहीं होने पर परीक्षा में
                  बैठने के लिए पुनःप्रवेश लेना होगा।
                </td>
              </tr>
              <tr className="">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  रूक जाना नहीं योजना पुनप्रवेश योजना
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  - मध्यमिक शिक्षा मंडल म.प्र. भोपाल की उसी सत्र में अनुत्तीर्ण
                  दर्शायी गई मूल अंकसूची। इस योजना में परीक्षाऐं हिन्दी एवं
                  अंग्रेजी माध्यम में ही होगी। भाषा के रूप में हिन्दी, अंग्रेजी,
                  संस्कृत और उर्दू विषय चयन की ही सुविधा योजनांतर्गत रखी गयी है।
                </td>
              </tr>
              <tr className="">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  सुविधा योजना
                </td>
                <td className="border border-gray-300 px-4 py-2">----</td>
              </tr>
              <tr className="">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  समकक्षता योजना
                </td>
                <td className="border border-gray-300 px-4 py-2">----</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <FeeStructureTable />
      <HighSchoolSubjectsTable />
    </div>
  )
}

export default TenthClass
