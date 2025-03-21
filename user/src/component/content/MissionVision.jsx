import React from 'react'
import hero from '../../assets/pp1.webp'
import hero2 from '../../assets/pp2.webp'

const MissionVision = () => {
  return (
    <div className="p-10">
      <h3 className="sm:text-4xl text-2xl text-center font-semibold border-x-4 py-2 my-3 text-white border-[#fd645b] bg-[#fd645b]">
        मिशन और विजन
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* विजन */}
        <div className="flex flex-col border rounded-md">
          <img src={hero} alt="विजन" className="rounded-md object-cover" />
          <h3 className="text-xl font-semibold text-gray-800 mt-4 ps-2">
            विजन
          </h3>
          <p className="text-gray-600 p-2">
            एजुकेट गर्ल्स का उद्देश्य सभी लड़कियों के लिए व्यावहारिक, सामाजिक और
            आर्थिक परिवर्तन लाना है, जिससे एक ऐसा भारत बने जहाँ सभी बच्चों को
            गुणवत्तापूर्ण शिक्षा प्राप्त करने के समान अवसर मिलें।
          </p>
          <button className="mt-4 px-6 py-2 text-red-400 font-bold text-sm self-start">
            और पढ़ें
          </button>
        </div>

        {/* मिशन */}
        <div className="flex flex-col border rounded-md">
          <img src={hero2} alt="मिशन" className="rounded-md object-cover" />
          <h3 className="text-xl font-semibold text-gray-800 mt-4 ps-2">
            मिशन
          </h3>
          <p className="text-gray-600 p-2">
            एजुकेट गर्ल्स मौजूदा सामुदायिक और सरकारी संसाधनों का उपयोग करके यह
            सुनिश्चित करता है कि सभी लड़कियाँ स्कूल में नामांकित हों और उन्हें
            गुणवत्तापूर्ण शिक्षा प्राप्त हो।
          </p>
          <button className="mt-4 px-6 py-2 text-red-400 font-bold text-sm self-start">
            और पढ़ें
          </button>
        </div>
      </div>
    </div>
  )
}

export default MissionVision
