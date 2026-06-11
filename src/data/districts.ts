export interface Upazila {
  name: string;
  nameBn: string;
}

export interface District {
  name: string;
  nameBn: string;
  upazilas: Upazila[];
}

export interface Division {
  name: string;
  nameBn: string;
  districts: District[];
}

export const divisionsAndDistricts: Division[] = [
  {
    name: "Dhaka",
    nameBn: "ঢাকা",
    districts: [
      {
        name: "Dhaka",
        nameBn: "ঢাকা",
        upazilas: [
          { name: "Savar", nameBn: "সাভার" },
          { name: "Dhamrai", nameBn: "ধামরাই" },
          { name: "Keraniganj", nameBn: "কেরানীগঞ্জ" },
          { name: "Nawabganj", nameBn: "নবাবগঞ্জ" },
          { name: "Dohar", nameBn: "দোহার" },
          { name: "Mirpur", nameBn: "মিরপুর" },
          { name: "Uttara", nameBn: "উত্তরা" },
          { name: "Dhanmondi", nameBn: "ধানমন্ডি" },
          { name: "Gulshan", nameBn: "গুলশান" },
          { name: "Mohammadpur", nameBn: "মোহাম্মদপুর" }
        ]
      },
      {
        name: "Gazipur",
        nameBn: "গাজীপুর",
        upazilas: [
          { name: "Gazipur Sadar", nameBn: "গাজীপুর সদর" },
          { name: "Kaliakair", nameBn: "কালিয়াকৈর" },
          { name: "Kaliganj", nameBn: "কালীগঞ্জ" },
          { name: "Kapasia", nameBn: "কাপাসিয়া" },
          { name: "Sreepur", nameBn: "শ্রীপুর" }
        ]
      },
      {
        name: "Narayanganj",
        nameBn: "নারায়ণগঞ্জ",
        upazilas: [
          { name: "Narayanganj Sadar", nameBn: "নারায়ণগঞ্জ সদর" },
          { name: "Araihazar", nameBn: "আড়াইহাজার" },
          { name: "Bandar", nameBn: "বন্দর" },
          { name: "Rupganj", nameBn: "রূপগঞ্জ" },
          { name: "Sonargaon", nameBn: "সোনারগাঁও" }
        ]
      },
      {
        name: "Tangail",
        nameBn: "টাঙ্গাইল",
        upazilas: [
          { name: "Tangail Sadar", nameBn: "টাঙ্গাইল সদর" },
          { name: "Basail", nameBn: "বাসাইল" },
          { name: "Bhuapur", nameBn: "ভূয়াপুর" },
          { name: "Delduar", nameBn: "দেলদুয়ার" },
          { name: "Ghatail", nameBn: "ঘাটাইল" },
          { name: "Gopalpur", nameBn: "গোপালপুর" },
          { name: "Kalihati", nameBn: "কালিহাতী" },
          { name: "Madhupur", nameBn: "মধুপুর" },
          { name: "Mirzapur", nameBn: "মির্জাপুর" },
          { name: "Nagarpur", nameBn: "নাগরপুর" },
          { name: "Sakhipur", nameBn: "সখিপুর" },
          { name: "Dhanbari", nameBn: "ধনবাড়ী" }
        ]
      },
      {
        name: "Faridpur",
        nameBn: "ফরিদপুর",
        upazilas: [
          { name: "Faridpur Sadar", nameBn: "ফরিদপুর সদর" },
          { name: "Bhanga", nameBn: "ভাঙ্গা" },
          { name: "Boalmari", nameBn: "বোয়ালমারী" },
          { name: "Alfadanga", nameBn: "আলফাডাঙ্গা" },
          { name: "Madhukhali", nameBn: "মধুখালী" },
          { name: "Nagarkanda", nameBn: "নগরকান্দা" },
          { name: "Sadarpur", nameBn: "সদরপুর" },
          { name: "Charbhadrasan", nameBn: "চরভদ্রাসন" },
          { name: "Saltha", nameBn: "শালথা" }
        ]
      },
      {
        name: "Gopalganj",
        nameBn: "গোপালগঞ্জ",
        upazilas: [
          { name: "Gopalganj Sadar", nameBn: "গোপালগঞ্জ সদর" },
          { name: "Kashiani", nameBn: "কাশিয়ানী" },
          { name: "Kotalipara", nameBn: "কোটালীপাড়া" },
          { name: "Muksudpur", nameBn: "মুকসুদপুর" },
          { name: "Tungipara", nameBn: "টুঙ্গিপাড়া" }
        ]
      },
      {
        name: "Kishoreganj",
        nameBn: "কিশোরগঞ্জ",
        upazilas: [
          { name: "Kishoreganj Sadar", nameBn: "কিশোরগঞ্জ সদর" },
          { name: "Astagram", nameBn: "অষ্টগ্রাম" },
          { name: "Bajitpur", nameBn: "বাজিতপুর" },
          { name: "Bhairab", nameBn: "ভৈরব" },
          { name: "Hossainpur", nameBn: "হোসেনপুর" },
          { name: "Itna", nameBn: "ইটনা" },
          { name: "Karimganj", nameBn: "করিমগঞ্জ" },
          { name: "Katiadi", nameBn: "কটিয়াদী" },
          { name: "Kuliarchar", nameBn: "কুলিয়ারচর" },
          { name: "Mithamain", nameBn: "মিঠামইন" },
          { name: "Nikli", nameBn: "নিকলী" },
          { name: "Pakundia", nameBn: "পাকুন্দিয়া" },
          { name: "Tarail", nameBn: "তাড়াইল" }
        ]
      },
      {
        name: "Madaripur",
        nameBn: "মাদারীপুর",
        upazilas: [
          { name: "Madaripur Sadar", nameBn: "মাদারীপুর সদর" },
          { name: "Kalkini", nameBn: "কালকিনি" },
          { name: "Rajoir", nameBn: "রাজৈর" },
          { name: "Shibchar", nameBn: "শিবচর" }
        ]
      },
      {
        name: "Manikganj",
        nameBn: "মানিকগঞ্জ",
        upazilas: [
          { name: "Manikganj Sadar", nameBn: "মানিকগঞ্জ সদর" },
          { name: "Singair", nameBn: "সিংগাইর" },
          { name: "Shibalaya", nameBn: "শিবালয়" },
          { name: "Harirampur", nameBn: "হরিরামপুর" },
          { name: "Ghior", nameBn: "ঘিওর" },
          { name: "Daulatpur", nameBn: "দৌলতপুর" },
          { name: "Saturia", nameBn: "সাটুরিয়া" }
        ]
      },
      {
        name: "Munshiganj",
        nameBn: "মুন্সীগঞ্জ",
        upazilas: [
          { name: "Munshiganj Sadar", nameBn: "মুন্সীগঞ্জ সদর" },
          { name: "Tongibari", nameBn: "টংগিবাড়ী" },
          { name: "Sreenagar", nameBn: "শ্রীনগর" },
          { name: "Louhajang", nameBn: "লৌহজং" },
          { name: "Gajaria", nameBn: "গজারিয়া" },
          { name: "Sirajdikhan", nameBn: "সিরাজদিখান" }
        ]
      },
      {
        name: "Narsingdi",
        nameBn: "নরসিংদী",
        upazilas: [
          { name: "Narsingdi Sadar", nameBn: "নরসিংদী সদর" },
          { name: "Belabo", nameBn: "বেলাবো" },
          { name: "Monohardi", nameBn: "মনোহরদী" },
          { name: "Palash", nameBn: "পলাশ" },
          { name: "Raipura", nameBn: "রায়পুরা" },
          { name: "Shibpur", nameBn: "শিবপুর" }
        ]
      },
      {
        name: "Rajbari",
        nameBn: "রাজবাড়ী",
        upazilas: [
          { name: "Rajbari Sadar", nameBn: "রাজবাড়ী সদর" },
          { name: "Baliakandi", nameBn: "বালিয়াকান্দি" },
          { name: "Goalanda", nameBn: "গোয়ালন্দ" },
          { name: "Pangsha", nameBn: "পাংশা" },
          { name: "Kalukhali", nameBn: "কালুখালী" }
        ]
      },
      {
        name: "Shariatpur",
        nameBn: "শরীয়তপুর",
        upazilas: [
          { name: "Shariatpur Sadar", nameBn: "শরীয়তপুর সদর" },
          { name: "Damudya", nameBn: "ডামুড্যা" },
          { name: "Jajira", nameBn: "জাজিরা" },
          { name: "Naria", nameBn: "নড়িয়া" },
          { name: "Bhedarganj", nameBn: "ভেদরগঞ্জ" },
          { name: "Gosairhat", nameBn: "গোসাইরহাট" }
        ]
      }
    ]
  },
  {
    name: "Chattogram",
    nameBn: "চট্টগ্রাম",
    districts: [
      {
        name: "Chattogram",
        nameBn: "চট্টগ্রাম",
        upazilas: [
          { name: "Hathazari", nameBn: "হাটহাজারী" },
          { name: "Sitakunda", nameBn: "সীতাকুণ্ড" },
          { name: "Mirsharai", nameBn: "মীরসরাই" },
          { name: "Patiya", nameBn: "পটিয়া" },
          { name: "Raozan", nameBn: "রাউজান" },
          { name: "Rangunia", nameBn: "রাঙ্গুনিয়া" },
          { name: "Sandwip", nameBn: "সন্দ্বীপ" },
          { name: "Fatikchhari", nameBn: "ফটিকছড়ি" },
          { name: "Boalkhali", nameBn: "বোয়ালখালী" },
          { name: "Anwara", nameBn: "আনোয়ারা" },
          { name: "Lohagara", nameBn: "লোহাগাড়া" },
          { name: "Banshkhali", nameBn: "বাঁশখালী" },
          { name: "Satkania", nameBn: "সাতকানিয়া" }
        ]
      },
      {
        name: "Cox's Bazar",
        nameBn: "কক্স বাজার",
        upazilas: [
          { name: "Cox's Bazar Sadar", nameBn: "কক্স বাজার সদর" },
          { name: "Chakaria", nameBn: "চকরিয়া" },
          { name: "Maheshkhali", nameBn: "মহেশখালী" },
          { name: "Ramu", nameBn: "রামু" },
          { name: "Teknaf", nameBn: "টেকনাফ" },
          { name: "Ukhia", nameBn: "উখিয়া" },
          { name: "Kutubdia", nameBn: "কুতুবদিয়া" },
          { name: "Pekua", nameBn: "পেকুয়া" }
        ]
      },
      {
        name: "Comilla",
        nameBn: "কুমিল্লা",
        upazilas: [
          { name: "Barura", nameBn: "বরুড়া" },
          { name: "Chandina", nameBn: "চান্দিনা" },
          { name: "Chauddagram", nameBn: "চৌদ্দগ্রাম" },
          { name: "Daudkandi", nameBn: "দাউদকান্দি" },
          { name: "Debidwar", nameBn: "দেবিদ্বার" },
          { name: "Homna", nameBn: "হোমনা" },
          { name: "Laksam", nameBn: "লাকসাম" },
          { name: "Muradnagar", nameBn: "মুরাদনগর" },
          { name: "Nangalkot", nameBn: "নাঙ্গলকোট" },
          { name: "Titas", nameBn: "তিতাস" },
          { name: "Meghna", nameBn: "মেঘনা" },
          { name: "Monohorganj", nameBn: "মনোহরগঞ্জ" }
        ]
      },
      {
        name: "Feni",
        nameBn: "ফেনী",
        upazilas: [
          { name: "Feni Sadar", nameBn: "ফেনী সদর" },
          { name: "Chhagalnaiya", nameBn: "ছাগলনাইয়া" },
          { name: "Daganbhuiyan", nameBn: "দাগনভূঞা" },
          { name: "Parshuram", nameBn: "পরশুরাম" },
          { name: "Sonagazi", nameBn: "সোনাগাজী" },
          { name: "Fulgazi", nameBn: "ফুলগাজী" }
        ]
      },
      {
        name: "Brahmanbaria",
        nameBn: "ব্রাহ্মণবাড়িয়া",
        upazilas: [
          { name: "Brahmanbaria Sadar", nameBn: "ব্রাহ্মণবাড়িয়া সদর" },
          { name: "Ashuganj", nameBn: "আশুগঞ্জ" },
          { name: "Bancharampur", nameBn: "বাঞ্ছারামপুর" },
          { name: "Bijoynagar", nameBn: "বিজয়নগর" },
          { name: "Kasba", nameBn: "কসবা" },
          { name: "Nabinagar", nameBn: "নবীনগর" },
          { name: "Nasirnagar", nameBn: "নাসিরনগর" },
          { name: "Sarail", nameBn: "সরাইল" },
          { name: "Akhaura", nameBn: "আখাউড়া" }
        ]
      },
      {
        name: "Chandpur",
        nameBn: "চাঁদপুর",
        upazilas: [
          { name: "Chandpur Sadar", nameBn: "চাঁদপুর সদর" },
          { name: "Faridganj", nameBn: "ফরিদগঞ্জ" },
          { name: "Haimchar", nameBn: "হাইমচর" },
          { name: "Haziganj", nameBn: "হাজীগঞ্জ" },
          { name: "Kachua", nameBn: "কচুয়া" },
          { name: "Shahrasti", nameBn: "শাহরাস্তি" },
          { name: "Matlab North", nameBn: "মতলব উত্তর" },
          { name: "Matlab South", nameBn: "মতলব দক্ষিণ" }
        ]
      },
      {
        name: "Noakhali",
        nameBn: "নোয়াখালী",
        upazilas: [
          { name: "Noakhali Sadar", nameBn: "নোয়াখালী সদর" },
          { name: "Begumganj", nameBn: "বেগমগঞ্জ" },
          { name: "Chatkhil", nameBn: "চাটখিল" },
          { name: "Companiganj", nameBn: "কোম্পানীগঞ্জ" },
          { name: "Hatiya", nameBn: "হাতিয়া" },
          { name: "Senbagh", nameBn: "সেনবাগ" },
          { name: "Sonaimuri", nameBn: "সোনাইমুড়ী" },
          { name: "Subarnachar", nameBn: "সুবর্ণচর" },
          { name: "Kabirhat", nameBn: "কবিরহাট" }
        ]
      },
      {
        name: "Lakshmipur",
        nameBn: "লক্ষ্মীপুর",
        upazilas: [
          { name: "Lakshmipur Sadar", nameBn: "লক্ষ্মীপুর সদর" },
          { name: "Raipur", nameBn: "রায়পুর" },
          { name: "Ramganj", nameBn: "রামগঞ্জ" },
          { name: "Ramgati", nameBn: "রামগতি" },
          { name: "Kamalnagar", nameBn: "কমলনগর" }
        ]
      },
      {
        name: "Bandarban",
        nameBn: "বান্দরবান",
        upazilas: [
          { name: "Bandarban Sadar", nameBn: "বান্দরবান সদর" },
          { name: "Alikadam", nameBn: "আলীকদম" },
          { name: "Lama", nameBn: "লামা" },
          { name: "Naikhongchhari", nameBn: "নাইক্ষ্যংছড়ি" },
          { name: "Rowangchhari", nameBn: "রোয়াংছড়ি" },
          { name: "Ruma", nameBn: "রুমা" },
          { name: "Thanchi", nameBn: "থানচি" }
        ]
      },
      {
        name: "Khagrachari",
        nameBn: "খাগড়াছড়ি",
        upazilas: [
          { name: "Khagrachari Sadar", nameBn: "খাগড়াছড়ি সদর" },
          { name: "Dighinala", nameBn: "দীঘিনালা" },
          { name: "Lakshmichhari", nameBn: "লক্ষ্মীছড়ি" },
          { name: "Mahalchhari", nameBn: "মহালছড়ি" },
          { name: "Manikchhari", nameBn: "মানিকছড়ি" },
          { name: "Matiranga", nameBn: "মাটিরাঙ্গা" },
          { name: "Panchhari", nameBn: "পানছড়ি" },
          { name: "Ramgarh", nameBn: "রামগড়" }
        ]
      },
      {
        name: "Rangamati",
        nameBn: "রাঙ্গামাটি",
        upazilas: [
          { name: "Rangamati Sadar", nameBn: "রাঙ্গামাটি সদর" },
          { name: "Kaptai", nameBn: "কাপ্তাই" },
          { name: "Kawkhali", nameBn: "কাউখালী" },
          { name: "Baghaichhari", nameBn: "বাঘাইছড়ি" },
          { name: "Barkal", nameBn: "বরকল" },
          { name: "Juraichhari", nameBn: "জুরাছড়ি" },
          { name: "Langadu", nameBn: "লংগদু" },
          { name: "Naniarchar", nameBn: "নানিয়ারচর" },
          { name: "Rajasthali", nameBn: "রাজস্থলী" },
          { name: "Bilaichhari", nameBn: "বিলাইছড়ি" }
        ]
      }
    ]
  },
  {
    name: "Rajshahi",
    nameBn: "রাজশাহী",
    districts: [
      {
        name: "Rajshahi",
        nameBn: "রাজশাহী",
        upazilas: [
          { name: "Paba", nameBn: "পবা" },
          { name: "Puthia", nameBn: "পুঠিয়া" },
          { name: "Godagari", nameBn: "গোদাগাড়ী" },
          { name: "Tanore", nameBn: "তানোর" },
          { name: "Bagmara", nameBn: "বাগমারা" },
          { name: "Charghat", nameBn: "চারঘাট" },
          { name: "Durgapur", nameBn: "দুর্গাপুর" },
          { name: "Bagha", nameBn: "বাঘা" },
          { name: "Mohanpur", nameBn: "মোহনপুর" }
        ]
      },
      {
        name: "Chapainawabganj",
        nameBn: "চাঁপাইনবাবগঞ্জ",
        upazilas: [
          { name: "Chapainawabganj Sadar", nameBn: "চাঁপাইনবাবগঞ্জ সদর" },
          { name: "Shibganj", nameBn: "শিবগঞ্জ" },
          { name: "Bholahat", nameBn: "ভোলাহাট" },
          { name: "Gomastapur", nameBn: "গোমস্তাপুর" },
          { name: "Nachole", nameBn: "নাচোল" }
        ]
      },
      {
        name: "Natore",
        nameBn: "নাটোর",
        upazilas: [
          { name: "Natore Sadar", nameBn: "নাটোর সদর" },
          { name: "Baraigram", nameBn: "বড়াইগ্রাম" },
          { name: "Gurudaspur", nameBn: "গুরুদাসপুর" },
          { name: "Lalpur", nameBn: "লালপুর" },
          { name: "Singra", nameBn: "সিংড়া" },
          { name: "Bagatipara", nameBn: "বাগাতিপাড়া" },
          { name: "Naldanga", nameBn: "নলডাঙ্গা" }
        ]
      },
      {
        name: "Naogaon",
        nameBn: "নওগাঁ",
        upazilas: [
          { name: "Naogaon Sadar", nameBn: "নওগাঁ সদর" },
          { name: "Atrai", nameBn: "আত্রাই" },
          { name: "Badalgachhi", nameBn: "বদলগাছী" },
          { name: "Dhamoirhat", nameBn: "ধামইরহাট" },
          { name: "Manda", nameBn: "মান্দা" },
          { name: "Mahadebpur", nameBn: "মহাদেবপুর" },
          { name: "Niamatpur", nameBn: "নিয়ামতপুর" },
          { name: "Patnitala", nameBn: "পত্নীতলা" },
          { name: "Porsha", nameBn: "পোরশা" },
          { name: "Sapahar", nameBn: "সাপাহার" },
          { name: "Raninagar", nameBn: "রানীনগর" }
        ]
      },
      {
        name: "Pabna",
        nameBn: "পাবনা",
        upazilas: [
          { name: "Pabna Sadar", nameBn: "পাবনা সদর" },
          { name: "Atgharia", nameBn: "আটঘরিয়া" },
          { name: "Bera", nameBn: "বেড়া" },
          { name: "Bhangura", nameBn: "ভাঙ্গুড়া" },
          { name: "Chatmohar", nameBn: "চাটমোহর" },
          { name: "Faridpur", nameBn: "ফরিদপুর" },
          { name: "Ishwardi", nameBn: "ঈশ্বরদী" },
          { name: "Santhia", nameBn: "সাঁথিয়া" },
          { name: "Sujanagar", nameBn: "সুজানগর" }
        ]
      },
      {
        name: "Sirajganj",
        nameBn: "সিরাজগঞ্জ",
        upazilas: [
          { name: "Sirajganj Sadar", nameBn: "সিরাজগঞ্জ সদর" },
          { name: "Belkuchi", nameBn: "বেলকুচি" },
          { name: "Chouhali", nameBn: "চৌহালী" },
          { name: "Kamarkhanda", nameBn: "কামারখন্দ" },
          { name: "Kazipur", nameBn: "কাজীপুর" },
          { name: "Raiganj", nameBn: "রায়গঞ্জ" },
          { name: "Shahjadpur", nameBn: "শাহজাদপুর" },
          { name: "Tarash", nameBn: "তাড়াশ" },
          { name: "Ullahpara", nameBn: "উল্লাপাড়া" }
        ]
      },
      {
        name: "Bogra",
        nameBn: "বগুড়া",
        upazilas: [
          { name: "Bogra Sadar", nameBn: "বগুড়া সদর" },
          { name: "Adamdighi", nameBn: "আদমদিঘী" },
          { name: "Dhunat", nameBn: "ধুনট" },
          { name: "Dupchanchia", nameBn: "দুপচাঁচিয়া" },
          { name: "Gabtali", nameBn: "গাবতলী" },
          { name: "Kahaloo", nameBn: "কাহালু" },
          { name: "Nandigram", nameBn: "নন্দীগ্রাম" },
          { name: "Sariakandi", nameBn: "সারিয়াকান্দি" },
          { name: "Shajahanpur", nameBn: "শাজাহানপুর" },
          { name: "Sherpur", nameBn: "শেরপুর" },
          { name: "Shibganj", nameBn: "শিবগঞ্জ" },
          { name: "Sonatola", nameBn: "সোনাতলা" }
        ]
      },
      {
        name: "Joypurhat",
        nameBn: "জয়পুরহাট",
        upazilas: [
          { name: "Joypurhat Sadar", nameBn: "জয়পুরহাট সদর" },
          { name: "Akkelpur", nameBn: "আক্কেলপুর" },
          { name: "Kalai", nameBn: "কালাই" },
          { name: "Khetlal", nameBn: "ক্ষেতলাল" },
          { name: "Panchbibi", nameBn: "পাঁচবিবি" }
        ]
      }
    ]
  },
  {
    name: "Khulna",
    nameBn: "খুলনা",
    districts: [
      {
        name: "Khulna",
        nameBn: "খুলনা",
        upazilas: [
          { name: "Batiaghata", nameBn: "বটিয়াঘাটা" },
          { name: "Dacope", nameBn: "দাকোপ" },
          { name: "Dumuria", nameBn: "ডুমুরিয়া" },
          { name: "Dighalia", nameBn: "দিঘলিয়া" },
          { name: "Koyra", nameBn: "কয়রা" },
          { name: "Paikgachha", nameBn: "পাইকগাছা" },
          { name: "Phultala", nameBn: "ফুলতলা" },
          { name: "Rupsha", nameBn: "রূপসা" },
          { name: "Terokhada", nameBn: "তেরখাদা" }
        ]
      },
      {
        name: "Jashore",
        nameBn: "যশোর",
        upazilas: [
          { name: "Jashore Sadar", nameBn: "যশোর সদর" },
          { name: "Abhaynagar", nameBn: "অভয়নগর" },
          { name: "Bagherpara", nameBn: "বাঘারপাড়া" },
          { name: "Chougachha", nameBn: "চৌগাছা" },
          { name: "Jhikargachha", nameBn: "ঝিকরগাছা" },
          { name: "Keshabpur", nameBn: "কেশবপুর" },
          { name: "Manirampur", nameBn: "মণিরামপুর" },
          { name: "Sharsha", nameBn: "শার্শা" }
        ]
      },
      {
        name: "Satkhira",
        nameBn: "সাতক্ষীরা",
        upazilas: [
          { name: "Satkhira Sadar", nameBn: "সাতক্ষীরা সদর" },
          { name: "Assasuni", nameBn: "আশাশুনি" },
          { name: "Debhata", nameBn: "দেবহাটা" },
          { name: "Kalaroa", nameBn: "কলারোয়া" },
          { name: "Kaliganj", nameBn: "কালীগঞ্জ" },
          { name: "Shyamnagar", nameBn: "শ্যামনগর" },
          { name: "Tala", nameBn: "তালা" }
        ]
      },
      {
        name: "Bagerhat",
        nameBn: "বাগেরহাট",
        upazilas: [
          { name: "Bagerhat Sadar", nameBn: "বাগেরহাট সদর" },
          { name: "Chitalmari", nameBn: "চিতলমারী" },
          { name: "Fakirhat", nameBn: "ফকিরহাট" },
          { name: "Kachua", nameBn: "কচুয়া" },
          { name: "Mollahat", nameBn: "মোল্লাহাট" },
          { name: "Mongla", nameBn: "মংলা" },
          { name: "Morrelganj", nameBn: "মোড়েলগঞ্জ" },
          { name: "Rampal", nameBn: "রামপাল" },
          { name: "Sarankhola", nameBn: "শরণখোলা" }
        ]
      },
      {
        name: "Kushtia",
        nameBn: "কুষ্টিয়া",
        upazilas: [
          { name: "Kushtia Sadar", nameBn: "কুষ্টিয়া সদর" },
          { name: "Kumarkhali", nameBn: "কুমারখালী" },
          { name: "Khoksa", nameBn: "খোকসা" },
          { name: "Mirpur", nameBn: "মিরপুর" },
          { name: "Bheramara", nameBn: "भेরামারা" },
          { name: "Daulatpur", nameBn: "দৌলতপুর" }
        ]
      },
      {
        name: "Jhenaidah",
        nameBn: "ঝিনাইদহ",
        upazilas: [
          { name: "Jhenaidah Sadar", nameBn: "ঝিনাইদহ সদর" },
          { name: "Harinakunda", nameBn: "হরিণাকুণ্ড" },
          { name: "Kaliganj", nameBn: "কালীগঞ্জ" },
          { name: "Kotchandpur", nameBn: "কোটচাঁদপুর" },
          { name: "Maheshpur", nameBn: "মহেশপুর" },
          { name: "Shailkupa", nameBn: "শৈলকুপা" }
        ]
      },
      {
        name: "Chuadanga",
        nameBn: "চুয়াডাঙ্গা",
        upazilas: [
          { name: "Chuadanga Sadar", nameBn: "চুয়াডাঙ্গা সদর" },
          { name: "Alamdanga", nameBn: "আলমডাঙ্গা" },
          { name: "Damurhuda", nameBn: "দামুড়হুদা" },
          { name: "Jibannagar", nameBn: "জীবননগর" }
        ]
      },
      {
        name: "Magura",
        nameBn: "মাগুরা",
        upazilas: [
          { name: "Magura Sadar", nameBn: "মাগুরা সদর" },
          { name: "Mohammadpur", nameBn: "মোহাম্মদপুর" },
          { name: "Shalikha", nameBn: "শালিখা" },
          { name: "Sreepur", nameBn: "শ্রীপুর" }
        ]
      },
      {
        name: "Meherpur",
        nameBn: "মেহেরপুর",
        upazilas: [
          { name: "Meherpur Sadar", nameBn: "মেহেরপুর সদর" },
          { name: "Gangni", nameBn: "গাংনী" },
          { name: "Mujibnagar", nameBn: "মুজিবনগর" }
        ]
      },
      {
        name: "Narail",
        nameBn: "নড়াইল",
        upazilas: [
          { name: "Narail Sadar", nameBn: "নড়াইল সদর" },
          { name: "Lohagara", nameBn: "লোহাগড়া" },
          { name: "Kalia", nameBn: "কালিয়া" }
        ]
      }
    ]
  },
  {
    name: "Barishal",
    nameBn: "বরিশাল",
    districts: [
      {
        name: "Barishal",
        nameBn: "বরিশাল",
        upazilas: [
          { name: "Barishal Sadar", nameBn: "বরিশাল সদর" },
          { name: "Bakerganj", nameBn: "বাকেরগঞ্জ" },
          { name: "Babuganj", nameBn: "বাবুগঞ্জ" },
          { name: "Banaripara", nameBn: "বানারীপাড়া" },
          { name: "Gaurnadi", nameBn: "গৌরনদী" },
          { name: "Hijla", nameBn: "হিজলা" },
          { name: "Mehendiganj", nameBn: "মেহেন্দিগঞ্জ" },
          { name: "Muladi", nameBn: "মুলাদী" },
          { name: "Wazirpur", nameBn: "উজিরপুর" }
        ]
      },
      {
        name: "Patuakhali",
        nameBn: "পটুয়াখালী",
        upazilas: [
          { name: "Patuakhali Sadar", nameBn: "পটুয়াখালী সদর" },
          { name: "Bauphal", nameBn: "বাউফল" },
          { name: "Dashmina", nameBn: "দশমিনা" },
          { name: "Galachipa", nameBn: "গলাচিপা" },
          { name: "Kalapara", nameBn: "কলাপাড়া" },
          { name: "Mirzaganj", nameBn: "মির্জাগঞ্জ" },
          { name: "Rangabali", nameBn: "রাঙ্গাবালী" },
          { name: "Dumki", nameBn: "দুমকি" }
        ]
      },
      {
        name: "Bhola",
        nameBn: "ভোলা",
        upazilas: [
          { name: "Bhola Sadar", nameBn: "ভোলা সদর" },
          { name: "Burhanuddin", nameBn: "বোরহানউদ্দিন" },
          { name: "Char Fasson", nameBn: "চরফ্যাশন" },
          { name: "Daulatkhan", nameBn: "দৌলতখান" },
          { name: "Lalmohan", nameBn: "লালমোহন" },
          { name: "Manpura", nameBn: "মনপুরা" },
          { name: "Tazumuddin", nameBn: "তজুমদ্দিন" }
        ]
      },
      {
        name: "Pirojpur",
        nameBn: "পিরোজপুর",
        upazilas: [
          { name: "Pirojpur Sadar", nameBn: "পিরোজপুর সদর" },
          { name: "Bhandaria", nameBn: "ভান্ডারিয়া" },
          { name: "Kawkhali", nameBn: "কাউখালী" },
          { name: "Mathbaria", nameBn: "মঠবাড়িয়া" },
          { name: "Nazirpur", nameBn: "নাজিরপুর" },
          { name: "Nesarabad", nameBn: "নেছারাবাদ" },
          { name: "Indurkani", nameBn: "ইন্দুরকানি" }
        ]
      },
      {
        name: "Barguna",
        nameBn: "বরগুনা",
        upazilas: [
          { name: "Barguna Sadar", nameBn: "বরগুনা সদর" },
          { name: "Amtali", nameBn: "আমতলী" },
          { name: "Bamna", nameBn: "বামনা" },
          { name: "Patharghata", nameBn: "পাথরঘাটা" },
          { name: "Taltali", nameBn: "তালতলী" },
          { name: "Betagi", nameBn: "বেতাগী" }
        ]
      },
      {
        name: "Jhalokati",
        nameBn: "ঝালকাঠি",
        upazilas: [
          { name: "Jhalokati Sadar", nameBn: "ঝালকাঠি সদর" },
          { name: "Kathalia", nameBn: "কাঠালিয়া" },
          { name: "Nalchity", nameBn: "নলছিটি" },
          { name: "Rajapur", nameBn: "রাজাপুর" }
        ]
      }
    ]
  },
  {
    name: "Sylhet",
    nameBn: "সিলেট",
    districts: [
      {
        name: "Sylhet",
        nameBn: "সিলেট",
        upazilas: [
          { name: "Sylhet Sadar", nameBn: "সিলেট সদর" },
          { name: "Beanibazar", nameBn: "বিয়ানীবাজার" },
          { name: "Bishwanath", nameBn: "বিশ্বনাথ" },
          { name: "Fenchuganj", nameBn: "ফেঞ্চুগঞ্জ" },
          { name: "Golapganj", nameBn: "গোলাপগঞ্জ" },
          { name: "Gowainghat", nameBn: "গোয়াইনঘাট" },
          { name: "Jaintiapur", nameBn: "জৈন্তাপুর" },
          { name: "Kanaighat", nameBn: "কানাইঘাট" },
          { name: "Balaganj", nameBn: "বালাগঞ্জ" },
          { name: "Companiganj", nameBn: "কোম্পানীগঞ্জ" },
          { name: "Dakshin Surma", nameBn: "দক্ষিণ সুরমা" },
          { name: "Zakiganj", nameBn: "জকিগঞ্জ" },
          { name: "Osmani Nagar", nameBn: "ওসমানী নগর" }
        ]
      },
      {
        name: "Moulvibazar",
        nameBn: "মৌলভীবাজার",
        upazilas: [
          { name: "Moulvibazar Sadar", nameBn: "মৌলভীবাজার সদর" },
          { name: "Barlekha", nameBn: "বড়লেখা" },
          { name: "Kamalganj", nameBn: "কমলগঞ্জ" },
          { name: "Kulaura", nameBn: "কুলাউড়া" },
          { name: "Rajnagar", nameBn: "রাজনগর" },
          { name: "Sreemangal", nameBn: "শ্রীমঙ্গল" },
          { name: "Juri", nameBn: "জুড়ী" }
        ]
      },
      {
        name: "Habiganj",
        nameBn: "হবিগঞ্জ",
        upazilas: [
          { name: "Habiganj Sadar", nameBn: "হবিগঞ্জ সদর" },
          { name: "Bahubal", nameBn: "বাহুবল" },
          { name: "Ajmiriganj", nameBn: "আজমিরীগঞ্জ" },
          { name: "Baniachong", nameBn: "বানিয়াচং" },
          { name: "Chunarughat", nameBn: "চুনারুঘাট" },
          { name: "Lakhai", nameBn: "লাখাই" },
          { name: "Madhabpur", nameBn: "মাধবপুর" },
          { name: "Nabiganj", nameBn: "নবীগঞ্জ" },
          { name: "Shaistaganj", nameBn: "শায়েস্তাগঞ্জ" }
        ]
      },
      {
        name: "Sunamganj",
        nameBn: "সুনামগঞ্জ",
        upazilas: [
          { name: "Sunamganj Sadar", nameBn: "সুনামগঞ্জ সদর" },
          { name: "Chhatak", nameBn: "ছাতক" },
          { name: "Derai", nameBn: "দিরাই" },
          { name: "Dharamapasha", nameBn: "ধর্মপাশা" },
          { name: "Dowarabazar", nameBn: "দোয়ারাবাজার" },
          { name: "Jagannathpur", nameBn: "জগন্নাথপুর" },
          { name: "Jamalganj", nameBn: "জামালগঞ্জ" },
          { name: "Sullah", nameBn: "শাল্লা" },
          { name: "Tahirpur", nameBn: "তাহিরপুর" },
          { name: "Shantiganj", nameBn: "শান্তিগঞ্জ" }
        ]
      }
    ]
  },
  {
    name: "Rangpur",
    nameBn: "রংপুর",
    districts: [
      {
        name: "Rangpur",
        nameBn: "রংপুর",
        upazilas: [
          { name: "Rangpur Sadar", nameBn: "রংপুর সদর" },
          { name: "Badarganj", nameBn: "বদরগঞ্জ" },
          { name: "Gangachara", nameBn: "গংগাচড়া" },
          { name: "Kaunia", nameBn: "কাউনিয়া" },
          { name: "Mithapukur", nameBn: "মিঠাপুকুর" },
          { name: "Pirgachha", nameBn: "পীরগাছা" },
          { name: "Pirganj", nameBn: "পীরগঞ্জ" },
          { name: "Taraganj", nameBn: "তারাগঞ্জ" }
        ]
      },
      {
        name: "Dinajpur",
        nameBn: "দিনাজপুর",
        upazilas: [
          { name: "Dinajpur Sadar", nameBn: "দিনাজপুর সদর" },
          { name: "Birampur", nameBn: "বিরামপুর" },
          { name: "Birganj", nameBn: "বীরগঞ্জ" },
          { name: "Birol", nameBn: "বিরল" },
          { name: "Bochaganj", nameBn: "বোচাগঞ্জ" },
          { name: "Chirirbandar", nameBn: "চিরিরবন্দর" },
          { name: "Phulbari", nameBn: "ফুলবাড়ী" },
          { name: "Ghoraghat", nameBn: "ঘোড়াঘাট" },
          { name: "Hakimpur", nameBn: "হাকিমপুর" },
          { name: "Kaharole", nameBn: "কাহারোল" },
          { name: "Khansama", nameBn: "খানসামা" },
          { name: "Nawabganj", nameBn: "নবাবগঞ্জ" },
          { name: "Parbatipur", nameBn: "পার্বতীপুর" }
        ]
      },
      {
        name: "Gaibandha",
        nameBn: "গাইবান্ধা",
        upazilas: [
          { name: "Gaibandha Sadar", nameBn: "গাইবান্ধা সদর" },
          { name: "Phulchhari", nameBn: "ফুলছড়ি" },
          { name: "Gobindaganj", nameBn: "গোবিন্দগঞ্জ" },
          { name: "Palashbari", nameBn: "পলাশবাড়ী" },
          { name: "Sadullapur", nameBn: "সাদুল্লাপুর" },
          { name: "Sughatta", nameBn: "সাঘাটা" },
          { name: "Sundarganj", nameBn: "সুন্দরগঞ্জ" }
        ]
      },
      {
        name: "Kurigram",
        nameBn: "কুড়িগ্রাম",
        upazilas: [
          { name: "Kurigram Sadar", nameBn: "কুড়িগ্রাম সদর" },
          { name: "Bhurungamari", nameBn: "ভুরুঙ্গামারী" },
          { name: "Char Rajibpur", nameBn: "রাজিবপুর" },
          { name: "Chilmari", nameBn: "চিলমারী" },
          { name: "Phulbari", nameBn: "ফুলবাড়ী" },
          { name: "Nageshwari", nameBn: "নাগেশ্বরী" },
          { name: "Rajarhat", nameBn: "রাজারহাট" },
          { name: "Raumari", nameBn: "রৌমারী" },
          { name: "Ulipur", nameBn: "উলিপুর" }
        ]
      },
      {
        name: "Nilphamari",
        nameBn: "নীলফামারী",
        upazilas: [
          { name: "Nilphamari Sadar", nameBn: "নীলফামারী সদর" },
          { name: "Dimla", nameBn: "ডিমলা" },
          { name: "Domar", nameBn: "ডোমার" },
          { name: "Jaldhaka", nameBn: "জলঢাকা" },
          { name: "Kishoreganj", nameBn: "কিশোরগঞ্জ" },
          { name: "Saidpur", nameBn: "সৈয়দপুর" }
        ]
      },
      {
        name: "Panchagarh",
        nameBn: "পঞ্চগড়",
        upazilas: [
          { name: "Panchagarh Sadar", nameBn: "পঞ্চগড় সদর" },
          { name: "Atwari", nameBn: "আটোয়ারী" },
          { name: "Boda", nameBn: "বোদা" },
          { name: "Debiganj", nameBn: "দেবীগঞ্জ" },
          { name: "Tetulia", nameBn: "তেতুলিয়া" }
        ]
      },
      {
        name: "Thakurgaon",
        nameBn: "ঠাকুরগাঁও",
        upazilas: [
          { name: "Thakurgaon Sadar", nameBn: "ঠাকুরগাঁও সদর" },
          { name: "Baliadangi", nameBn: "বালিয়াডাঙ্গী" },
          { name: "Haripur", nameBn: "হরিপুর" },
          { name: "Ranisankail", nameBn: "রানীশংকৈল" },
          { name: "Pirganj", nameBn: "পীরগঞ্জ" }
        ]
      },
      {
        name: "Lalmonirhat",
        nameBn: "লালমনিরহাট",
        upazilas: [
          { name: "Lalmonirhat Sadar", nameBn: "লালমনিরহাট সদর" },
          { name: "Aditmari", nameBn: "আদিতমারী" },
          { name: "Hatibandha", nameBn: "হাতিবান্ধা" },
          { name: "Kaliganj", nameBn: "কালীগঞ্জ" },
          { name: "Patgram", nameBn: "পাটগ্রাম" }
        ]
      }
    ]
  },
  {
    name: "Mymensingh",
    nameBn: "ময়মনসিংহ",
    districts: [
      {
        name: "Mymensingh",
        nameBn: "ময়মনসিংহ",
        upazilas: [
          { name: "Mymensingh Sadar", nameBn: "ময়মনসিংহ সদর" },
          { name: "Bhaluka", nameBn: "ভালুকা" },
          { name: "Trishal", nameBn: "ত্রিশাল" },
          { name: "Haluaghat", nameBn: "হালুয়াঘাট" },
          { name: "Muktagachha", nameBn: "মুক্তাগাছা" },
          { name: "Dhobaura", nameBn: "ধোবাউড়া" },
          { name: "Fulbaria", nameBn: "ফুলবাড়ীয়া" },
          { name: "Gafargaon", nameBn: "গফরগাঁও" },
          { name: "Gauripur", nameBn: "গৌরীপুর" },
          { name: "Ishwarganj", nameBn: "ঈশ্বরগঞ্জ" },
          { name: "Nandail", nameBn: "নন্দাইল" },
          { name: "Phulpur", nameBn: "ফুলপুর" }
        ]
      },
      {
        name: "Jamalpur",
        nameBn: "জামালপুর",
        upazilas: [
          { name: "Jamalpur Sadar", nameBn: "জামালপুর সদর" },
          { name: "Bakshiganj", nameBn: "বকশীগঞ্জ" },
          { name: "Dewanganj", nameBn: "দেওয়ানগঞ্জ" },
          { name: "Isampur", nameBn: "ইসলামপুর" },
          { name: "Madarganj", nameBn: "মাদারগঞ্জ" },
          { name: "Melandaha", nameBn: "মেলান্দহ" },
          { name: "Sarishabari", nameBn: "সরিষাবাড়ী" }
        ]
      },
      {
        name: "Netrokona",
        nameBn: "নেত্রকোনা",
        upazilas: [
          { name: "Netrokona Sadar", nameBn: "নেত্রকোণা সদর" },
          { name: "Atpara", nameBn: "আটপাড়া" },
          { name: "Barhatta", nameBn: "বারহাট্টা" },
          { name: "Durgapur", nameBn: "দুর্গাপুর" },
          { name: "Khaliajuri", nameBn: "খালিয়াজুরী" },
          { name: "Kalmakanda", nameBn: "কলমাকান্দা" },
          { name: "Kendua", nameBn: "কেন্দুয়া" },
          { name: "Madan", nameBn: "মদন" },
          { name: "Mohanganj", nameBn: "মোহনগঞ্জ" },
          { name: "Purbadhala", nameBn: "পূর্বধলা" }
        ]
      },
      {
        name: "Sherpur",
        nameBn: "শেরপুর",
        upazilas: [
          { name: "Sherpur Sadar", nameBn: "শেরপুর সদর" },
          { name: "Jhenaigati", nameBn: "ঝিনাইগাতী" },
          { name: "Nakla", nameBn: "নকলা" },
          { name: "Nalitabari", nameBn: "নালিতাবাড়ী" },
          { name: "Sreebardi", nameBn: "শ্রীবরদী" }
        ]
      }
    ]
  }
];
