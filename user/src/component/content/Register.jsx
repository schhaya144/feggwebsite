import React, { useState } from 'react'
import axios from 'axios'
import SummaryApi from '../../common/SummaryApi'
import fagglogo from '../../../public/eg-logo.png'
import districtData from '../../data/Mpdistricts.json'
import { FaAngleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Register = () => {
  const [declarationAccepted, setDeclarationAccepted] = useState(false)
  const [showFullText, setShowFullText] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    fatherFirstName: '',
    fatherMiddleName: '',
    fatherLastName: '',
    motherFirstName: '',
    motherMiddleName: '',
    motherLastName: '',
    permanentAddress: '',
    block: '',
    village: '',
    district: '',
    tehsil: '',
    pincode: '',
    dob: '',
    age: '',
    gender: '',
    religion: '',
    category: '',
    contactNo: '',
    sssmid: '',
    lastClassStudied: '',
    applyFor: '',
    appearing: '',
    status: '',
    mail: '',
    scheme: '',
    declarationAccepted: false,
  })

  // Data for districts, tehsils, and blocks
  // const districtData = {
  //   AgarMalwa: {
  //     tehsils: ['Agar', 'Badod', 'Nalkheda', 'Soyatkala', 'Susner'],
  //     blocks: ['Agar', 'Barod', 'Nalkheda', 'Susner'],
  //   },
  //   Alirajpur: {
  //     tehsils: [
  //       'Alirajpur',
  //       'Chandra Shekhar Azad Nagar',
  //       'Jobat',
  //       'Katthiwara',
  //       'Sondawa',
  //     ],
  //     blocks: [
  //       'Alirajpur',
  //       'Bhabra',
  //       'Jobat',
  //       'Katthiwada',
  //       'Sondwa',
  //       'Udaigarh',
  //     ],
  //   },
  //   Anuppur: {
  //     tehsils: ['Anuppur', 'Jaithari', 'Kotma', 'Pushparajgarh'],
  //     blocks: ['Anuppur', 'Jaithari', 'Kotma', 'Pushprajgarh'],
  //   },
  //   Ashoknagar: {
  //     tehsils: [
  //       'Ashoknagar',
  //       'Bahadurpur',
  //       'Chanderi',
  //       'Isagarh',
  //       'Mungaoli',
  //       'Nai Sarai',
  //       'Piprai',
  //       'Shadhora',
  //     ],
  //     blocks: ['Ashoknagar', 'Chanderi', 'Isagarh', 'Mungaoli'],
  //   },
  //   Balaghat: {
  //     tehsils: [
  //       'Baihar',
  //       'Balaghat',
  //       'Birsa',
  //       'Katangi',
  //       'Khairlanji',
  //       'Kirnapur',
  //       'Lalbarra',
  //       'Lamta',
  //       'Lanji',
  //       'Paraswada',
  //       'Tirodi',
  //       'Waraseoni',
  //     ],
  //     blocks: [
  //       'Baihar',
  //       'Balaghat',
  //       'Birsa',
  //       'Katangi',
  //       'Khairlanji',
  //       'Kirnapur',
  //       'Lalbarra',
  //       'Lanji',
  //       'Paraswada',
  //       'Waraseoni',
  //     ],
  //   },
  //   Barwani: {
  //     tehsils: [
  //       'Anjad',
  //       'Barwani',
  //       'Niwali',
  //       'Pansemal',
  //       'Pati',
  //       'Rajpur',
  //       'Sendhwa',
  //       'Thikri',
  //       'Varla',
  //     ],
  //     blocks: [
  //       'Barwani',
  //       'Newali',
  //       'Pansemal',
  //       'Pati',
  //       'Rajpur',
  //       'Sendhawa',
  //       'Thikri',
  //     ],
  //   },
  //   Betul: {
  //     tehsils: [
  //       'Amla',
  //       'Athner',
  //       'Betul',
  //       'Betul Nagar',
  //       'Bhainsdehi',
  //       'Bhimpur',
  //       'Chicholi',
  //       'Ghoda Dongri',
  //       'Multai',
  //       'Prabhatpttan',
  //       'Shahpur',
  //     ],
  //     blocks: [
  //       'Amla',
  //       'Athner',
  //       'Betul',
  //       'Bhainsdehi',
  //       'Bhimpur',
  //       'Chicholi',
  //       'Ghoradongri',
  //       'Multai',
  //       'Prabhat Pattan',
  //       'Shahpur',
  //     ],
  //   },
  //   Bhind: {
  //     tehsils: [
  //       'Ater',
  //       'Bhind',
  //       'Bhind Nagar',
  //       'Gohad',
  //       'Gormi',
  //       'Lahar',
  //       'Mau',
  //       'Mehgaon',
  //       'Mihona',
  //       'Ron',
  //     ],
  //     blocks: ['Ater', 'Bhind', 'Gohad', 'Lahar', 'Mehgaon', 'Raon'],
  //   },
  //   Bhopal: {
  //     tehsils: ['Berasia', 'Huzur', 'Kolar'],
  //     blocks: ['Berasia', 'Phanda'],
  //   },
  //   Burhanpur: {
  //     tehsils: [
  //       'Burhanpur',
  //       'Burhanpur Nagar',
  //       'Dhulcot',
  //       'Khaknar',
  //       'Nepanagar',
  //     ],
  //     blocks: ['Burhanpur', 'Khaknar'],
  //   },
  //   Chhatarpur: {
  //     tehsils: [
  //       'Bada Malhera',
  //       'Bijawar',
  //       'Buxwaha',
  //       'Chandla',
  //       'Chhatarpur',
  //       'Chhatarpur Nagar',
  //       'Gaurihar',
  //       'Ghuwara',
  //       'Lavkush Nagar',
  //       'Maharajpur',
  //       'Nowgong',
  //       'Rajnagar',
  //       'Satai',
  //     ],
  //     blocks: [
  //       'Bada Malehara',
  //       'Barigarh',
  //       'Bijawar',
  //       'Buxwaha',
  //       'Chhatarpur',
  //       'Lavkush Nagar',
  //       'Nowgong',
  //       'Rajnagar',
  //     ],
  //   },
  //   Chhindwara: {
  //     tehsils: [
  //       'Amarwara',
  //       'Bichhua',
  //       'Chand',
  //       'Chaurai',
  //       'Chhindwara',
  //       'Chhindwara Nagar',
  //       'Harrai',
  //       'Jamai (Junnardeo)',
  //       'Mohkhed',
  //       'Parasia',
  //       'Tamia',
  //       'Umreth',
  //     ],
  //     blocks: [
  //       'Amarwara',
  //       'Bichhua',
  //       'Chaurai',
  //       'Chhindwara',
  //       'Harrai',
  //       'Jamai',
  //       'Mohkhed',
  //       'Parasia',
  //       'Tamia',
  //     ],
  //   },
  //   Damoh: {
  //     tehsils: [
  //       'Batiyagarh',
  //       'Damoh',
  //       'Damyanti Nagar',
  //       'Hatta',
  //       'Jabera',
  //       'Patera',
  //       'Patharia',
  //       'Tendukheda',
  //     ],
  //     blocks: [
  //       'Batiyagarh',
  //       'Damoh',
  //       'Hatta',
  //       'Jabera',
  //       'Patera',
  //       'Pathariya',
  //       'Tendukheda',
  //     ],
  //   },
  //   Datia: {
  //     tehsils: [
  //       'Baroni',
  //       'Bhander',
  //       'Datia',
  //       'Datia Nagar',
  //       'Indergarh',
  //       'Seondha',
  //     ],
  //     blocks: ['Bhander', 'Datia', 'Seondha'],
  //   },
  //   Dewas: {
  //     tehsils: [
  //       'Bagli',
  //       'Dewas',
  //       'Dewas Nagar',
  //       'Hatpiplya',
  //       'Kannod',
  //       'Khategaon',
  //       'Satwas',
  //       'Sonkatch',
  //       'Tonk Khurd',
  //       'Udaynagar',
  //     ],
  //     blocks: [
  //       'Bagli',
  //       'Dewas',
  //       'Kannod',
  //       'Khategaon',
  //       'Sonkatch',
  //       'Tonk Khurd',
  //     ],
  //   },
  //   Dhar: {
  //     tehsils: [
  //       'Badnawar',
  //       'Dahi',
  //       'Dhar',
  //       'Dharampuri',
  //       'Gandhwani',
  //       'Kukshi',
  //       'Manawar',
  //       'Pithampur',
  //       'Sardarpur',
  //     ],
  //     blocks: [
  //       'Badnawar',
  //       'Bagh',
  //       'Dahi',
  //       'Dhar',
  //       'Dharampuri',
  //       'Gandhwani',
  //       'Kukshi',
  //       'Manawar',
  //       'Nalchha',
  //       'Nisarpur',
  //       'Sardarpur',
  //       'Tirla',
  //       'Umarban',
  //     ],
  //   },
  //   Dindori: {
  //     tehsils: ['Bajag', 'Dindori', 'Shahpura'],
  //     blocks: [
  //       'Amarpur',
  //       'Bajag',
  //       'Dindori',
  //       'Karanjiya',
  //       'Mehandwani',
  //       'Samnapur',
  //       'Shahpura',
  //     ],
  //   },
  //   Guna: {
  //     tehsils: [
  //       'Aron',
  //       'Bamori',
  //       'Chachaura',
  //       'Guna',
  //       'Guna Nagar',
  //       'Kumbhraj',
  //       'Maksoodangarh',
  //       'Raghogarh',
  //     ],
  //     blocks: ['Aron', 'Bamori', 'Chanchoda', 'Guna', 'Raghogarh'],
  //   },
  //   Gwalior: {
  //     tehsils: [
  //       'Bhitarwar',
  //       'Chinour',
  //       'City Center',
  //       'Dabra',
  //       'Ghatigaon',
  //       'Gird',
  //       'Gwalior Gramin',
  //       'Morar',
  //       'Pichhor',
  //       'Tansen',
  //     ],
  //     blocks: ['Bhitarwar', 'Dabra', 'Ghatigaon', 'Morar'],
  //   },
  //   Harda: {
  //     tehsils: [
  //       'Handiya',
  //       'Harda',
  //       'Khirkiya',
  //       'Rehatgaon',
  //       'Sirali',
  //       'Timarni',
  //     ],
  //     blocks: ['Harda', 'Khirkiya', 'Timarni'],
  //   },
  //   Indore: {
  //     tehsils: [
  //       'Bicholi Hapsi',
  //       'Depalpur',
  //       'Dr. Ambedkar Nagar (Mhow)',
  //       'Hatod',
  //       'Indore',
  //       'Kanadia',
  //       'Khudel',
  //       'Malharganj',
  //       'Rau',
  //       'Sanwer',
  //     ],
  //     blocks: ['Depalpur', 'Indore', 'Mhow', 'Sanwer'],
  //   },
  //   Jabalpur: {
  //     tehsils: [
  //       'Adhartal',
  //       'Gorakhpur',
  //       'Jabalpur',
  //       'Kundam',
  //       'Majholi',
  //       'Panagar',
  //       'Patan',
  //       'Ranjhi',
  //       'Shahpura',
  //       'Sihora',
  //     ],
  //     blocks: [
  //       'Jabalpur',
  //       'Kundam',
  //       'Majhouli',
  //       'Panagar',
  //       'Patan',
  //       'Shahpura',
  //       'Sihora',
  //     ],
  //   },
  //   Jhabua: {
  //     tehsils: [
  //       'Jhabua',
  //       'Meghnagar',
  //       'Petlawad',
  //       'Rama',
  //       'Ranapur',
  //       'Thandla',
  //     ],
  //     blocks: ['Jhabua', 'Meghnagar', 'Petlawad', 'Rama', 'Ranapur', 'Thandla'],
  //   },
  //   Katni: {
  //     tehsils: [
  //       'Badwara',
  //       'Bahoriband',
  //       'Barhi',
  //       'Dhimarkheda',
  //       'Katni Nagar',
  //       'Murwara Or Katni',
  //       'Rithi',
  //       'Sleemnabad',
  //       'Vijayraghavgarh',
  //     ],
  //     blocks: [
  //       'Badwara',
  //       'Bahoriband',
  //       'Dheemerkheda',
  //       'Katni',
  //       'Rithi',
  //       'Vijayraghavgarh',
  //     ],
  //   },
  //   Khandwa: {
  //     tehsils: [
  //       'Chhaigaon Makhan',
  //       'Harsud',
  //       'Khalwa',
  //       'Khandwa',
  //       'Khandwa Nagar',
  //       'Killod',
  //       'Mundi',
  //       'Pandhana',
  //       'Punasa',
  //     ],
  //     blocks: [
  //       'Baladi',
  //       'Chhaigaon Makhan',
  //       'Harsud',
  //       'Khalwa',
  //       'Khandwa',
  //       'Pandhana',
  //       'Punasa',
  //     ],
  //   },
  //   Khargone: {
  //     tehsils: [
  //       'Barwaha',
  //       'Bhagwanpura',
  //       'Bhikangaon',
  //       'Gogaon',
  //       'Jhiranya',
  //       'Kasrawad',
  //       'Khargone',
  //       'Khargone Nagar',
  //       'Maheshwar',
  //       'Sanawad',
  //       'Segaon',
  //     ],
  //     blocks: [
  //       'Barwah',
  //       'Bhagvanpura',
  //       'Bhikangaon',
  //       'Gogawan',
  //       'Kasrawad',
  //       'Khargone',
  //       'Maheshwar',
  //       'Segaon',
  //       'Ziranya',
  //     ],
  //   },
  //   Mauganj: {
  //     tehsils: ['Hanumana', 'Mauganj', 'Naigarhi'],
  //     blocks: ['Hanumana', 'Mauganj', 'Naigarhi'],
  //   },
  //   Maihar: {
  //     tehsils: ['Amarpatan', 'Maihar', 'Ramnagar'],
  //     blocks: ['Amarpatan', 'Maihar', 'Ramnagar'],
  //   },
  //   Mandla: {
  //     tehsils: [
  //       'Bichhiya',
  //       'Ghughari',
  //       'Mandla',
  //       'Nainpur',
  //       'Narayanganj',
  //       'Niwas',
  //     ],
  //     blocks: [
  //       'Bichhiya',
  //       'Bijadandi',
  //       'Ghughri',
  //       'Mandla',
  //       'Mawai',
  //       'Mohgaon',
  //       'Nainpur',
  //       'Narayanganj',
  //       'Niwas',
  //     ],
  //   },
  //   Mandsaur: {
  //     tehsils: [
  //       'Bhanpura',
  //       'Daloda',
  //       'Garoth',
  //       'Malhargarh',
  //       'Mandsaur',
  //       'Mandsaur Nagar',
  //       'Shamgarh',
  //       'Sitamau',
  //       'Suwasara',
  //     ],
  //     blocks: ['Bhanpura', 'Garoth', 'Malhargarh', 'Mandsaur', 'Sitamau'],
  //   },
  //   Morena: {
  //     tehsils: [
  //       'Ambah',
  //       'Bamor',
  //       'Joura',
  //       'Kailaras',
  //       'Morena',
  //       'Morena Nagar',
  //       'Porsa',
  //       'Sabalgarh',
  //     ],
  //     blocks: [
  //       'Ambah',
  //       'Joura',
  //       'Kailaras',
  //       'Morena',
  //       'Pahadgarh',
  //       'Porsa',
  //       'Sabalgarh',
  //     ],
  //   },
  //   Narmadapuram: {
  //     tehsils: [
  //       'Bankhedi',
  //       'Dolariya',
  //       'Hoshangabad',
  //       'Hoshangabad Nagar',
  //       'Itarsi',
  //       'Makhan Nagar',
  //       'Pipariya',
  //       'Seoni Malwa',
  //       'Sohagpur',
  //     ],
  //     blocks: [
  //       'Bankhedi',
  //       'Kesla',
  //       'Makhan Nagar',
  //       'Narmadapuram',
  //       'Pipariya',
  //       'Seoni Malwa',
  //       'Sohagpur',
  //     ],
  //   },
  //   Narsimhapur: {
  //     tehsils: [
  //       'Bankhedi',
  //       'Kesla',
  //       'Makhan Nagar',
  //       'Narmadapuram',
  //       'Pipariya',
  //       'Seoni Malwa',
  //       'Sohagpur',
  //       'Babai Chichali',
  //       'Chawarpatha',
  //       'Gotegaon',
  //       'Kareli',
  //       'Narsimhapur',
  //       'Sainkheda',
  //     ],
  //     blocks: [],
  //   },
  //   Neemuch: {
  //     tehsils: [
  //       'Jawad',
  //       'Jiran',
  //       'Manasa',
  //       'Neemuch',
  //       'Neemuch Nagar',
  //       'Rampura',
  //       'Singoli',
  //     ],
  //     blocks: ['Jawad', 'Manasa', 'Neemuch'],
  //   },
  //   Niwari: {
  //     tehsils: ['Niwari', 'Orchha', 'Prithvipur'],
  //     blocks: ['Niwari', 'Prithvipur'],
  //   },
  //   Pandhurna: {
  //     tehsils: ['Pandhurna', 'Sausar'],
  //     blocks: ['Pandhurna', 'Sausar'],
  //   },
  //   Panna: {
  //     tehsils: [
  //       'Ajaygarh',
  //       'Amanganj',
  //       'Devendranagar',
  //       'Gunnor',
  //       'Panna',
  //       'Pawai',
  //       'Raipura',
  //       'Shahnagar',
  //       'Simariya',
  //     ],
  //     blocks: ['Ajaigarh', 'Gunour', 'Panna', 'Pawai', 'Shahnagar'],
  //   },
  //   Raisen: {
  //     tehsils: [
  //       'Badi',
  //       'Baraily',
  //       'Begamganj',
  //       'Deori',
  //       'Gairatganj',
  //       'Goharganj',
  //       'Raisen',
  //       'Silwani',
  //       'Sultanpur',
  //       'Udaipura',
  //     ],
  //     blocks: [
  //       'Badi',
  //       'Begamganj',
  //       'Gairatganj',
  //       'Obaidallaganj',
  //       'Sanchi',
  //       'Silwani',
  //       'Udaipura',
  //     ],
  //   },
  //   Rajgarh: {
  //     tehsils: [
  //       'Biaora',
  //       'Jeerapur',
  //       'Khilchipur',
  //       'Khujner',
  //       'Narsinghgarh',
  //       'Pachore',
  //       'Rajgarh',
  //       'Sarangpur',
  //       'Suthaliya',
  //     ],
  //     blocks: [
  //       'Biaora',
  //       'Khilchipur',
  //       'Narsinghgarh',
  //       'Rajgarh',
  //       'Sarangpur',
  //       'Zirapur',
  //     ],
  //   },
  //   Ratlam: {
  //     tehsils: [
  //       'Alot',
  //       'Bajna',
  //       'Jaora',
  //       'Piploda',
  //       'Raoti',
  //       'Ratlam',
  //       'Ratlam Nagar',
  //       'Sailana',
  //       'Tal',
  //     ],
  //     blocks: ['Alot', 'Bajna', 'Jaora', 'Piploda', 'Ratlam', 'Sailana'],
  //   },
  //   Rewa: {
  //     tehsils: [
  //       'Gurh',
  //       'Huzur',
  //       'Huzur Nagar',
  //       'Jawa',
  //       'Mangawan',
  //       'Raipur Karchuliyan',
  //       'Semaria',
  //       'Sirmour',
  //       'Teonthar',
  //       'Gangev',
  //     ],
  //     blocks: ['Jawa', 'Raipur Karchuliyan', 'Rewa', 'Sirmour', 'Teonthar'],
  //   },
  //   Sagar: {
  //     tehsils: [
  //       'Banda',
  //       'Bandari',
  //       'Bina',
  //       'Deori',
  //       'Garhakota',
  //       'Jaisinagar',
  //       'Kesli',
  //       'Khurai',
  //       'Malthon',
  //       'Rahatgarh',
  //       'Rehli',
  //       'Sagar',
  //       'Sagar Nagar',
  //       'Shahgarh',
  //     ],
  //     blocks: [
  //       'Banda',
  //       'Bina',
  //       'Deori',
  //       'Jaisinagar',
  //       'Kesli',
  //       'Khurai',
  //       'Malthone',
  //       'Rahatgarh',
  //       'Rehli',
  //       'Sagar',
  //       'Shahgarh',
  //     ],
  //   },
  //   Satna: {
  //     tehsils: [
  //       'Birsinghpur',
  //       'Kotar',
  //       'Kothi',
  //       'Majhgawan',
  //       'Nagod',
  //       'Raghurajnagar (Nagriya)',
  //       'Rampur Baghelan',
  //       'Unchehara',
  //     ],
  //     blocks: ['Majhgawan', 'Nagod', 'Rampur Baghelan', 'Sohawal', 'Unchahara'],
  //   },
  //   Sehore: {
  //     tehsils: [
  //       'Ashta',
  //       'Bhairunda',
  //       'Budni',
  //       'Doraha',
  //       'Ichhawar',
  //       'Jawar',
  //       'Rehti',
  //       'Sehore',
  //       'Sehore Nagar',
  //       'Shyampur',
  //     ],
  //     blocks: ['Ashta', 'Budni', 'Ichhawar', 'Nasrullaganj', 'Sehore'],
  //   },
  //   Seoni: {
  //     tehsils: [
  //       'Barghat',
  //       'Chhapara',
  //       'Dhanora',
  //       'Ghansaur',
  //       'Keolari',
  //       'Kurai',
  //       'Lakhnadon',
  //       'Seoni',
  //       'Seoni Nagar',
  //     ],
  //     blocks: [
  //       'Barghat',
  //       'Chhapara',
  //       'Dhanaura',
  //       'Kahnapas(Ghansaur)',
  //       'Keolari',
  //       'Kurai',
  //       'Lakhnadon',
  //       'Seoni',
  //     ],
  //   },
  //   Shahdol: {
  //     tehsils: [
  //       'Beohari',
  //       'Burhar',
  //       'Gohparu',
  //       'Jaisinghnagar',
  //       'Jaitpur',
  //       'Sohagpur',
  //     ],
  //     blocks: ['Beohari', 'Burhar', 'Gohparu', 'Jaisinghnagar', 'Sohagpur'],
  //   },
  //   Shajapur: {
  //     tehsils: [
  //       'Avantipur Barodia',
  //       'Gulana',
  //       'Kalapipal',
  //       'Moman Badodiya',
  //       'Polaykala',
  //       'Shajapur',
  //       'Shujalpur',
  //     ],
  //     blocks: ['Kalapipal', 'Moman Badodia', 'Shajapur', 'Shujalpur'],
  //   },
  //   Sheopur: {
  //     tehsils: ['Badoda', 'Beerpur', 'Karahal', 'Sheopur', 'Vijaypur'],
  //     blocks: ['Karahal', 'Sheopur', 'Vijaypur'],
  //   },
  //   Shivpuri: {
  //     tehsils: [
  //       'Badarwas',
  //       'Bairad',
  //       'Karera',
  //       'Khaniyadhana',
  //       'Kolaras',
  //       'Narwar',
  //       'Pichhore',
  //       'Pohri',
  //       'Rannod',
  //       'Shivpuri',
  //       'Shivpuri Nagar',
  //     ],
  //     blocks: [
  //       'Badarwas',
  //       'Karera',
  //       'Khaniadhana',
  //       'Kolaras',
  //       'Narwar',
  //       'Pichhore',
  //       'Pohri',
  //       'Shivpuri',
  //     ],
  //   },
  //   Sidhi: {
  //     tehsils: [
  //       'Bahari',
  //       'Churhat',
  //       'Gopadbanas',
  //       'Kusmi',
  //       'Madwas',
  //       'Majhauli',
  //       'Rampur Naikin',
  //       'Sihawal',
  //     ],
  //     blocks: ['Kusmi', 'Majhauli', 'Rampur Naikin', 'Sidhi', 'Sihawal'],
  //   },
  //   Singrauli: {
  //     tehsils: [
  //       'Bargawan',
  //       'Chitrangi',
  //       'Deosar',
  //       'Dudhamania',
  //       'Mada',
  //       'Sarai',
  //       'Singrauli',
  //       'Singrauli Nagar',
  //     ],
  //     blocks: ['Baidhan', 'Chitrangi', 'Devsar'],
  //   },
  //   Tikamgarh: {
  //     tehsils: [
  //       'Badagaon (Dhasan)',
  //       'Baldeogarh',
  //       'Dighora',
  //       'Jatara',
  //       'Khargapur',
  //       'Lidhora',
  //       'Mohangarh',
  //       'Palera',
  //       'Tikamgarh',
  //     ],
  //     blocks: ['Baldeogarh', 'Jatara', 'Palera', 'Tikamgarh'],
  //   },
  //   Ujjain: {
  //     tehsils: [
  //       'Badnagar',
  //       'Ghatiya',
  //       'Jharda',
  //       'Khacharod',
  //       'Kothi Mahal',
  //       'Mahidpur',
  //       'Makdon',
  //       'Nagda',
  //       'Tarana',
  //       'Ujjain',
  //       'Ujjain Nagar',
  //       'Unhel',
  //     ],
  //     blocks: [
  //       'Badnagar',
  //       'Ghatiya',
  //       'Khacharod',
  //       'Mahidpur',
  //       'Tarana',
  //       'Ujjain',
  //     ],
  //   },
  //   Umaria: {
  //     tehsils: [
  //       'Bandhavgarh',
  //       'Bilaspur',
  //       'Chandia',
  //       'Karkeli',
  //       'Manpur',
  //       'Nowrozabad',
  //       'Pali',
  //     ],
  //     blocks: ['Karkeli', 'Manpur', 'Pali'],
  //   },
  //   Vidisha: {
  //     tehsils: [
  //       'Basoda',
  //       'Gulabganj',
  //       'Gyaraspur',
  //       'Kurwai',
  //       'Lateri',
  //       'Nateran',
  //       'Pathari',
  //       'Shamshabad',
  //       'Sironj',
  //       'Tyonda',
  //       'Vidisha',
  //       'Vidisha Nagar',
  //     ],
  //     blocks: [
  //       'Basoda',
  //       'Gyaraspur',
  //       'Kurwai',
  //       'Lateri',
  //       'Nateran',
  //       'Sironj',
  //       'Vidisha',
  //     ],
  //   },
  // }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value }

      // When district changes, reset tehsil and block
      if (name === 'district') {
        newData.tehsil = '' // Reset tehsil
        newData.block = '' // Reset block
      }

      return newData
    })
  }

  // Handle date of birth change and calculate age
  const handleDobChange = (e) => {
    const dob = e.target.value
    setFormData((prevData) => {
      const newData = { ...prevData, dob }

      // Calculate age based on DOB
      const age = calculateAge(dob)
      newData.age = age

      return newData
    })
  }

  // Function to calculate age based on DOB
  const calculateAge = (dob) => {
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()

    // Adjust age if the birthday hasn't occurred yet this year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--
    }

    return age
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // // Required Field Check
    // for (const key in formData) {
    //   if (!formData[key] && key !== 'fatherMiddleName') {
    //     alert(`${key.replace(/([A-Z])/g, ' $1')} is required.`)
    //     return
    //   }
    // }

    // Phone Number Validation
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(formData.contactNo)) {
      alert('Please enter a valid 10-digit phone number.')
      return
    }

    // SSSM ID Validation (9 Digits)
    if (!/^\d{9}$/.test(formData.sssmid)) {
      alert('SSSM ID must be exactly 9 digits.')
      return
    }

    // Pincode Validation (6 Digits)
    if (!/^\d{6}$/.test(formData.pincode)) {
      alert('Pincode must be exactly 6 digits.')
      return
    }

    // Age Validation (Must be 18+)
    if (formData.age < 18) {
      alert('You must be at least 18 years old to register.')
      return
    }

    // Ensure user is eligible based on status & last class studied
    if (formData.status === 'Fail' && formData.lastClassStudied === '5th') {
      alert('You are not eligible to register.')
      return
    }
    if (formData.declarationAccepted === false) {
      alert('please check mark the declaration.')
      return
    }
    try {
      const response = await axios.post(SummaryApi.Register.url, formData)
      if (response.status === 200) {
        alert('Registration successful!')
      }
      if (response.status === 201) {
        // Success: Student registration successful
        alert(response.data.message) // This will show "Student registered successfully"
        console.log('Learner ID:', response.data.learnerId) // Optional: Log learner ID if needed
      }
    } catch (error) {
      // Check if the error is from axios and has a response from the server
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message

        if (
          errorMessage.includes('duplicate key error') ||
          errorMessage.includes('Contact number')
        ) {
          alert(errorMessage) // Display the duplicate contact number message
        } else {
          alert('Registration failed. Please try again.')
        }
      } else {
        console.error('There was an error during registration:', error)
        alert('Registration failed. Please try again.')
      }
    }
  }

  const districtOptions = Object.keys(districtData)

  const tehsilOptions = formData.district
    ? districtData[formData.district]?.tehsils
    : []
  const blockOptions = formData.district
    ? districtData[formData.district]?.blocks
    : []

  const handleCheckboxChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      declarationAccepted: e.target.checked, // Update state correctly
    }))
  }

  const handleToggle = () => {
    setShowFullText(!showFullText)
  }
  return (
    <div className=" min-h-screen flex sm:flex-row flex-col  items-start justify-center p-4 bg-cover bg-no-repeat">
      <Link
        to="/"
        className="relative bg-[#fd645b] sm:px-4 px-2  rounded-lg me-2"
      >
        <FaAngleLeft size={30} className="text-white" />
      </Link>
      <div className="  shadow-2xl w-full max-w-4xl sm:p-7 p-5">
        <div className="flex justify-center items-center flex-col ">
          <img
            src={fagglogo}
            className="w-24 bg-[#ffffff86] bg-cover bg-no-repeat object-fill border-[#fe0000] border-l-2  border-b-2 rounded-full py-2"
          />
          <h1 className="text-2xl font-bold text-center my-5 ">छात्र पंजीयन</h1>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
            <label className="block">
              छात्र का फ़र्स्ट नेम
              <span className="text-red-500 font-semibold">*</span>
              <input
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
                required
              />
            </label>
            <label className="block">
              मिडिल नेम
              <input
                type="text"
                name="middleName"
                placeholder="Enter Middle Name"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
              />
            </label>
            <label className="block">
              लास्ट नेम <span className="text-red-500">*</span>
              <input
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
            <label className="block">
              पिता का फ़र्स्ट नेम <span className="text-red-500">*</span>
              <input
                type="text"
                name="fatherFirstName"
                placeholder="Enter Father's First Name"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
                required
              />
            </label>
            <label className="block">
            मिडिल नेम
              <input
                type="text"
                name="fatherMiddleName"
                placeholder="Enter Father's Middle Name"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
              />
            </label>
            <label className="block">
              लास्ट नेम <span className="text-red-500">*</span>
              <input
                type="text"
                name="fatherLastName"
                placeholder="Enter Father's Last Name"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="grid sm:grid-cols-3  grid-cols-2 gap-4">
            <label className="block sm:text-base text-sm">
              माता का फ़र्स्ट नेम<span className="text-red-500">*</span>
              <input
                type="text"
                name="motherFirstName"
                placeholder="Enter Father's First Name"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
                required
              />
            </label>
            <label className="block">
            मिडिल नेम 
              <input
                type="text"
                name="motherMiddleName"
                placeholder="Enter Father's Middle Name"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
              />
            </label>
            <label className="block">
              लास्ट नेम <span className="text-red-500">*</span>
              <input
                type="text"
                name="motherLastName"
                placeholder="Enter Father's Last Name"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label className="block">
            स्थाई पता <span className="text-red-500">*</span>
            <input
              type="text"
              name="permanentAddress"
              placeholder="Enter Permanent Address"
              className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
              onChange={handleChange}
              required
            />
          </label>

          <div className="grid grid-cols-3 gap-4">
            <label className="block">
              जिला <span className="text-red-500">*</span>
              <select
                name="district"
                className="w-full border  text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
                required
              >
                <option value="">Select District</option>
                {districtOptions.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              तहसील<span className="text-red-500">*</span>
              <select
                name="tehsil"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
                required
              >
                <option value="">Select Tehsil</option>
                {tehsilOptions.map((tehsil) => (
                  <option key={tehsil} value={tehsil}>
                    {tehsil}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              ब्लॉक <span className="text-red-500">*</span>
              <select
                name="block"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
                required
              >
                <option value="">Select Block</option>
                {blockOptions.map((block) => (
                  <option key={block} value={block}>
                    {block}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              गाँव
              <input
                type="text"
                name="village"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
              />
            </label>
            <label className="block">
              पिन कोड <span className="text-red-500">*</span>
              <input
                type="number"
                name="pincode"
                placeholder="Enter Pincode"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
                pattern="\d{6}"
                title="Enter a valid 6-digit pincode"
                required
              />
            </label>

            <label className="block">
              ई-मेल
              <input
                type="email"
                name="mail"
                placeholder="Enter E-mail Address"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
              />
            </label>
          </div>
          {/* DOB and Age calculation */}
          <div className="grid grid-cols-3 gap-4">
            <label className="block">
              जन्म तिथि <span className="text-red-500">*</span>
              <input
                type="date"
                name="dob"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleDobChange}
                required
              />
            </label>
            <label className="block">
              आयु <span className="text-red-500">*</span>
              <input
                type="number"
                name="age"
                value={formData.age}
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                readOnly
              />
            </label>
            <label className="block">
              लिंग <span className="text-red-500">*</span>
              <select
                name="gender"
                className="w-full text-black border border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </label>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <label className="block">
              धर्म <span className="text-red-500">*</span>
              <select
                name="religion"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Hindu">Hindu</option>
                <option value="Muslim">Muslim</option>
                <option value="Buddhist">Buddhist</option>
                <option value="Christian">Christian</option>
                <option value="Jewish">Jewish</option>
                <option value="Parsi">Parsi</option>
                <option value="Sikh">Sikh</option>
                <option value="Jain">Jain</option>
                <option value="Others">Others</option>
              </select>
            </label>
            <label className="block">
              श्रेणी <span className="text-red-500">*</span>
              <select
                name="category"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="General">General</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="OBC">OBC</option>
                <option value="OBC">EWS</option>
              </select>
            </label>
            <label className="block">
              संपर्क नंबर <span className="text-red-500">*</span>
              <input
                type="text"
                name="contactNo"
                placeholder="Enter Contact No"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
                pattern="[6-9]{1}[0-9]{9}"
                title="Enter a valid 10-digit phone number"
                required
              />
            </label>
          </div>
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
            <label className="block">
              SSSM ID <span className="text-red-500">*</span>
              <input
                type="number"
                name="sssmid"
                placeholder="Enter 9-digit Samagra ID"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
                pattern="\d{9}"
                title="Enter exactly 9 digits"
                required
              />
            </label>
            <label className="block">
              आप ने अंतिम कक्षा कौन सी पढ़ी है ?
              <span className="text-red-500">*</span>
              <select
                name="lastClassStudied"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
                required
              >
                <option value="">Select Last Class Studied</option>
                <option value="10th">10th</option>
                <option value="9th">9th</option>
                <option value="8th">8th</option>
                <option value="7th">7th</option>
                <option value="6th">6th</option>
                <option value="5th">5th</option>
              </select>
            </label>

            <label className="block">
              स्थिति <span className="text-red-500">*</span>
              <select
                name="status"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
                required
              >
                <option value="">Status (Pass/Fail)</option>
                <option value="Pass">Pass</option>
                <option value="Fail">Fail</option>
              </select>
            </label>
            <label className="block">
              आवेदन किस योजना अंतर्गत है <span className="text-red-500">*</span>
              <select
                name="scheme"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
                required
              >
                <option value="">Select Class</option>
                <option value="Open School (Parampragat)">
                  Open School (Parampragat)
                </option>
                <option value="RJN (Rook Jana Nahi)">
                  RJN (Rook Jana Nahi)
                </option>
                <option value="ALC (Aa Laut Chale)">ALC (Aa Laut Chale)</option>{' '}
                <option value="Super Section (SS)">Super Section (SS)</option>{' '}
                <option value="Saksham Bhaiya Behna (SBB)">
                  Saksham Bhaiya Behna (SBB)
                </option>
              </select>
            </label>
            <label className="block">
              आप किस कक्षा के लिए आवेदन कर रहे है?
              <span className="text-red-500">*</span>
              <select
                name="appearing"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
                required
              >
                <option value="">Select Class</option>
                <option value="10th">10th</option>
                <option value="12th">12th</option>
              </select>
            </label>
            <label className="block">
              आवेदन का प्रकार <span className="text-red-500">*</span>
              <select
                name="applyFor"
                className="w-full border text-black border-[#fd645b] rounded p-2 focus:outline-none  focus:ring-2 focus:ring-[#fd645b]"
                onChange={handleChange}
                required
              >
                <option value="">Select Option</option>
                <option value="New Student">New Student</option>
                <option value="TOC">TOC</option>
                <option value="SYC">SYC</option>
              </select>
            </label>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex  gap-2 mb-3">
              <input
                type="checkbox"
                checked={formData.declarationAccepted}
                onChange={handleCheckboxChange}
              />
              <p className="text-[#fd645b] t">
                एजुकेट गर्ल्स द्वारा प्रदान की गई सुविधाओं का उपयोग करने के लिए
                आवेदक को निम्नलिखित घोषणा देना अनिवार्य है:
              </p>
            </div>
            <div className="flex justify-center">
  <p className="text-sm text-justify inline">
    {showFullText
      ? `मैं घोषणा करता /करती हूँ कि मेरे द्वारा प्रदान की गई व्यक्तिगत जानकारी सत्य, सटीक और पूर्ण है। यदि इसमें किसी प्रकार की कोई असत्य जानकारी पायी गयी तो मेरा पंजीकरण रद्द किया जा सकता है। मैं एजुकेट गर्ल्स को अधिकृत करता /करती हूँ कि वो प्रदान की गई जानकारी की प्रामाणिकता को सत्यापित कर सकते हैं। मैं पंजीकरण, शैक्षणिक और संचार उद्देश्यों के लिए अपनी व्यक्तिगत जानकारी के उपयोग के लिए सहमति देता/देती हूँ, और स्वीकार करता /करती हूँ कि मेरा डेटा एजुकेट गर्ल्स गोपनीयता नीति के अनुसार सुरक्षित रूप से संग्रहीत किया जाएगा। मैं एजुकेट गर्ल्स के सभी नियमों और विनियमों का पालन करने के लिए सहमत हूँ और समझता /समझती हूँ कि गैर-अनुपालन के परिणामस्वरूप अनुशासनात्मक कार्रवाई हो सकती है।`
      : `मैं घोषणा करता /करती हूँ कि मेरे द्वारा प्रदान की गई व्यक्तिगत जानकारी सत्य, सटीक और पूर्ण है...`}
    <button
      onClick={handleToggle}
      className="text-blue-500 cursor-pointer ml-1 inline"
    >
      {showFullText ? 'कम पढ़ें' : 'और पढ़ें'}
    </button>
  </p>
</div>

          </div>
          <div className="flex justify-center gap-4">
            <button
              type="reset"
              className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600"
            >
              मिटाएँ 
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600"
            >
              जमा करें 
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
