import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import img from "../../assets/imptreelung.jpg";
import img1 from "../../assets/mission.png";
import img2 from "../../assets/imptree.jpg";

const Research = () => {


  return (
    <div className="flex flex-col justify-center items-center px-4 lg:px-16 min-h-screen mt-12 text-justify">


      <div className="mt-8 bg-white  p-2 md:p-8 rounded-lg border-t-4 border-green-600 w-full">
        {/* Flex container for the image and the content */}
        <div className="flex flex-col lg:flex-row lg:items-start mb-6">
          <div className="lg:w-1/2">
          <h1 className="text-2xl font-semibold text-green-700 mb-2 animate-title">Oxygen Crisis: Importance of Trees</h1>
            <p className="text-lg mb-4 animate-info">
              Oxygen: Amid the second wave of COVID-19 in India, hospitals are facing a shortage of beds and oxygen. 
              Experts say that if more trees had been planted, the country wouldn't have experienced such a severe oxygen shortage. 
              The natural resources we had were not utilized efficiently, and widespread deforestation has led to today’s oxygen crisis.
            </p>
            <p className="text-lg mb-4 animate-info">
              Previously, oxygen was naturally available from trees, but now it is being produced in factories. Experts emphasize that people 
              should act quickly and plant as many trees as possible. A healthy tree releases about 230 liters of oxygen each day, which is 
              enough for seven people. However, burning garbage around trees reduces their oxygen-producing capacity by half, depriving three 
              people of oxygen.
            </p>
          </div>
          
          {/* Image next to the content */}
          <div className="lg:w-1/2 lg:ml-8 flex justify-center pt-5">
            <img
              src={img}
              alt="Tree providing oxygen"
              className="image flex-shrink-0 rounded-lg shadow-md w-full "
            />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-green-700 mb-2 animate-info">What Do Experts Say?</h2>
        <p className="text-lg mb-4 animate-info">
          As the oxygen crisis due to COVID-19 worsens, people are discussing planting more trees on social media and other platforms. 
          Trees are considered the best and only natural source of oxygen. Experts believe that if more trees had been planted, 
          we wouldn't have faced such an acute shortage of oxygen. According to experts, without sufficient oxygen in the environment, 
          it’s impossible to produce oxygen in any plant. Therefore, it’s vital to focus on planting more trees.
        </p>

        {/* Flex container for content and image */}
        <div className="flex flex-col lg:flex-row lg:items-start mb-6">
          <div className="lg:w-1/2">
            <p className="text-lg mb-4 animate-info lg:pt-8">
              Previously, oxygen was naturally available from trees, but now it is being produced in factories. Experts emphasize that people 
              should act quickly and plant as many trees as possible. A healthy tree releases about 230 liters of oxygen each day, which is 
              enough for seven people. However, burning garbage around trees reduces their oxygen-producing capacity by half, depriving three 
              people of oxygen.
            </p>
          </div>
          
          {/* Image next to content */}
          <div className="lg:w-1/2 lg:ml-8 flex justify-center">
            <img
              src={img1}
              alt="Factory producing oxygen"
              className="image flex-shrink-0 max-w-full rounded-lg shadow-md lg:max-w-xl"
            />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-green-700 mb-2 animate-info">The Growing Threat of Deforestation</h2>
        <p className="text-lg mb-4 animate-info">
          Deforestation has become the biggest threat to the environment. Therefore, it’s not just about planting trees but also about saving 
          the ones we already have. We must be vigilant about preventing trees from being cut down and avoid setting fires near them. 
          Experts recommend that for every 50 meters, there should be at least one tree to ensure enough fresh air for local residents.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mb-2 animate-info">The Importance of Tree Planting</h2>
        <p className="text-lg mb-4 animate-info">
          As per scientists, an environmentalist, spoke at an event on World Environment Day and shared the numerous benefits of planting trees. 
          Trees provide five major benefits:
        </p>
        <ul className="list-disc pl-6 animate-info">
          <li>Trees produce oxygen that is vital for human life.</li>
          <li>They prevent soil erosion by binding the ground.</li>
          <li>Trees help in raising groundwater levels.</li>
          <li>They reduce atmospheric temperature, with tree-covered areas being 3 to 4 degrees Celsius cooler than surrounding places.</li>
          <li>Protecting trees is essential for maintaining a balanced environment and safeguarding human health.</li>
        </ul>

        <div className="flex justify-center my-6">
          <img
            src={img2}
            alt="Benefits of trees"
            className="image flex-shrink-0 max-w-full  rounded-lg "
          />
        </div>

        <h2 className="text-2xl font-semibold text-green-700 mb-2 animate-info">Key Statistics</h2>
        <p className="text-lg animate-info">
          On average, a large tree produces about 227 liters of oxygen daily, while a human being requires about 550 liters 
          (19 cubic feet) of oxygen daily. Therefore, it's crucial to plant more trees and take steps to protect the existing ones. 
          Planting trees not only helps the environment but also plays a vital role in saving lives.
        </p>
      </div>
    </div>
  );
};

export default Research;
