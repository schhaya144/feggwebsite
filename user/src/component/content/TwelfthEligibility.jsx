import React from 'react'
import EducationSchemes12 from './EducationSchemes12'

const TwelfthEligibility = () => {
  const eligibilityCriteria = [
    {
      title: 'आयु ',
      details: [
        'कोई बंधन नहीं।.',
        'कोई बंधन नहीं। ',

        'माध्यमिक शिक्षा मंडल, म.प्र. भोपाल की अधिकृत सूची में मान्य बोर्ड से हाईस्कूल परीक्षा और उसके समकक्ष परीक्षा उत्तीर्ण का प्रमाण-पत्र /अंकसूची जिसमें जन्मतिथि का उल्लेख हो। ',
      ],
    },
    {
      title: 'न्यूनतम शैक्षणिक योग्यता ',
      details: [
        'मा.शि.मं. म.प्र. भोपाल की अधिकृत सूची में मान्य बोर्ड से हाईस्कूल परीक्षा और उसके समकक्ष परीक्षा उत्तीर्ण का प्रमाण-पत्र / अंकसूची संलग्न करें।',
      ],
    },
    {
      title: 'अ.जा./अ.ज.जा.के छात्रों के प्रवेश शुल्क में छूट हेतु।',
      details: ['सक्षम प्राधिकारी द्वारा प्रदत्त जाति प्रमाण पत्र। '],
    },
    {
      title:
        '40% या अधिक विकलांगता वाले छात्रों को प्रवेश / परीक्षा शुल्क में छूट। ',
      details: ['जिला चिकित्सा बोर्ड द्वारा प्रदत्त विकलांगता प्रमाण-पत्र ।'],
    },
    {
      title: 'बी.पी.एल. कार्डधारी छात्रों को प्रवेश हेतु शुल्क में छूट।',
      details: [
        'जिला खाद्य नियंत्रक अधिकारी अथवा म.प्र. शासन समय-समय प्राधिकृत द्वारा पर सक्षम प्राधिकारी द्वारा प्रदत्त प्रमाण पत्र।',
      ],
    },
  ]

  return (
    <div className="px-4 sm:px-12  rounded-lg shadow-md">
      <h3 className="text-lg sm:text-2xl font-semibold text-white text-center my-5 border-[#fd645b] border-x-4 bg-[#fd645b] pt-1 py-1 w-full">
        Class 12th
      </h3>
      <p className="flex justify-center items-center font-bold">
        अर्हताएँ एवं संलग्न किये जाने वाले दस्तावेज
      </p>
      <table className="w-full border-collapse border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">अर्हताएँ</th>
            <th className="border border-gray-300 px-4 py-2">
              हायर सेकेण्डरी 12( Required Documents)
            </th>
          </tr>
        </thead>
        <tbody>
          {eligibilityCriteria.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                {item.title}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <ul className="list-disc list-inside">
                  {item.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EducationSchemes12 />
    </div>
  )
}

export default TwelfthEligibility
