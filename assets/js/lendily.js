        // --- STATE MANAGEMENT ---
        const demoUser = { name: 'Jane Doe', email: 'jane.doe@example.com', phone: '+2348012345678', role: 'lender', lendilyId: 'LN-JANE', walletBalance: 185000 };
        let loggedIn = true;
        let currentUser = { ...demoUser };
        let deferredInstallPrompt = null;
        let currentLanguage = 'en';

        const translations = {
            en: {
                'nav.home': 'Home',
                'nav.create': 'Create',
                'nav.dashboard': 'Dashboard',
                'nav.dash': 'Dash',
                'nav.support': 'Support',
                'nav.profile': 'Profile',
                'actions.offer': 'Offer',
                'actions.request': 'Request',
                'actions.review': 'Review',
                'auth.logout': 'Logout',
                'auth.login': 'Login',
                'pwa.install': 'Install',
                'form.interestRate': 'Interest Rate (%)',
                'form.markup': 'Markup (%)',
                'form.profitExpected': 'Profit Expected',
                'form.sendRequest': 'Send Request to Lender',
                'form.createOffer': 'Create Offer & Get Lendily ID'
            },
            ha: {
                'nav.home': 'Gida',
                'nav.create': 'Kirkiro',
                'nav.dashboard': 'Allon Bayani',
                'nav.dash': 'Allo',
                'nav.support': 'Taimako',
                'nav.profile': 'Bayanan Kai',
                'actions.offer': 'Bayarwa',
                'actions.request': 'Nema',
                'actions.review': 'Dubawa',
                'auth.logout': 'Fita',
                'auth.login': 'Shiga',
                'pwa.install': 'Saka',
                'form.interestRate': 'Kudin Riba (%)',
                'form.markup': 'Ribar Ciniki (%)',
                'form.profitExpected': 'Ribar da ake so',
                'form.sendRequest': 'Aika Bukata ga Mai Ba da Kudi',
                'form.createOffer': 'Kirkiro Bayarwa & Sami Lendily ID'
            },
            ig: {
                'nav.home': 'Ụlọ',
                'nav.create': 'Mepụta',
                'nav.dashboard': 'Dashboard',
                'nav.dash': 'Dash',
                'nav.support': 'Nkwado',
                'nav.profile': 'Profaịlụ',
                'actions.offer': 'Nye',
                'actions.request': 'Rịọ',
                'actions.review': 'Nyochaa',
                'auth.logout': 'Pụọ',
                'auth.login': 'Banye',
                'pwa.install': 'Wụnye',
                'form.interestRate': 'Ọnụego ọmụrụnwa (%)',
                'form.markup': 'Uru Ahịa (%)',
                'form.profitExpected': 'Uru a tụrụ anya',
                'form.sendRequest': 'Ziga Arịrịọ Nye Onye Na-agbazinye',
                'form.createOffer': 'Mepụta Onyinye & Nweta Lendily ID'
            },
            yo: {
                'nav.home': 'Ile',
                'nav.create': 'Ṣẹda',
                'nav.dashboard': 'Dasibodu',
                'nav.dash': 'Dashi',
                'nav.support': 'Iranlọwọ',
                'nav.profile': 'Profaili',
                'actions.offer': 'Funni',
                'actions.request': 'Bẹ̀rẹ̀',
                'actions.review': 'Ṣayẹwo',
                'auth.logout': 'Jade',
                'auth.login': 'Wọle',
                'pwa.install': 'Fi Sori Ẹrọ',
                'form.interestRate': 'Oṣuwọn Ere (%)',
                'form.markup': 'Ere Tita (%)',
                'form.profitExpected': 'Ere Ti A Nreti',
                'form.sendRequest': 'Fi Ibere Ranṣẹ si Oluyawo',
                'form.createOffer': 'Ṣẹda Ipese & Gba Lendily ID'
            }
        };

        const t = (key) => translations[currentLanguage]?.[key] || translations.en[key] || key;
        const phraseTranslations = {
            ha: {
                'Home': 'Gida',
                'Create': 'Kirkiro',
                'Dashboard': 'Allon Bayani',
                'Support': 'Taimako',
                'Profile': 'Bayanan Kai',
                'New Agreement': 'Sabuwar Yarjejeniya',
                'Logout': 'Fita',
                'Login': 'Shiga',
                'Sign Up': 'Yi Rajista',
                'My Dashboard': 'Allon Bayanina',
                'User Profile': 'Bayanan Mai Amfani',
                'Borrower & Lender': 'Mai Nema & Mai Ba da Kudi',
                'Lender Profile': 'Bayanan Mai Ba da Kudi',
                'Borrower Profile': 'Bayanan Mai Nema',
                'Profile Details': 'Cikakken Bayani',
                'These details power both your lender and borrower profile completeness.': 'Wadannan bayanai suna cika bayanan mai ba da kudi da mai nema.',
                'Change Password': 'Canja Kalmar Sirri',
                'Update your login password for this Lendily profile.': 'Sabunta kalmar sirrin shiga wannan bayanin Lendily.',
                'Full Name': 'Cikakken Suna',
                'Phone Number': 'Lambar Waya',
                'Date of Birth': 'Ranar Haihuwa',
                'ID Number': 'Lambar Shaida',
                'Residential Address': 'Adireshin Zama',
                'State': 'Jiha',
                'LGA': 'Karamar Hukuma',
                'Bank Name': 'Sunan Banki',
                'Account Number': 'Lambar Asusu',
                'Account Name': 'Sunan Asusu',
                'Upload ID Document': 'Loda Takardar Shaida',
                'Upload Passport Photo': 'Loda Hoton Fasfo',
                'Save Profile Details': 'Ajiye Bayanan Profile',
                'Current Password': 'Kalmar Sirri ta Yanzu',
                'New Password': 'Sabuwar Kalmar Sirri',
                'Confirm Password': 'Tabbatar da Kalmar Sirri',
                'Update Password': 'Sabunta Kalmar Sirri',
                'Done': 'An yi',
                'Missing': 'Babu',
                'Install': 'Saka',
                'Offer': 'Bayarwa',
                'Request': 'Nema',
                'Review': 'Dubawa',
                'Back to Dashboard': 'Koma Allon Bayani',
                'Quick Links': 'Hanyoyi Masu Sauri',
                'Legal': 'Doka',
                'Follow Us': 'Biyo Mu',
                'Newsletter': 'Wasikar Labarai'
            },
            ig: {
                'Home': 'Ụlọ',
                'Create': 'Mepụta',
                'Dashboard': 'Dashboard',
                'Support': 'Nkwado',
                'Profile': 'Profaịlụ',
                'New Agreement': 'Nkwekọrịta Ọhụrụ',
                'Logout': 'Pụọ',
                'Login': 'Banye',
                'Sign Up': 'Debanye Aha',
                'My Dashboard': 'Dashboard M',
                'User Profile': 'Profaịlụ Onye Ọrụ',
                'Borrower & Lender': 'Onye Na-agbaziri & Onye Na-agbazinye',
                'Lender Profile': 'Profaịlụ Onye Na-agbazinye',
                'Borrower Profile': 'Profaịlụ Onye Na-agbaziri',
                'Profile Details': 'Nkọwa Profaịlụ',
                'These details power both your lender and borrower profile completeness.': 'Nkọwa ndị a na-eme ka profaịlụ gị zuo oke.',
                'Change Password': 'Gbanwee Paswọọdụ',
                'Update your login password for this Lendily profile.': 'Melite paswọọdụ nbanye maka profaịlụ Lendily a.',
                'Full Name': 'Aha Zuru Ezu',
                'Phone Number': 'Nọmba Ekwentị',
                'Date of Birth': 'Ụbọchị Ọmụmụ',
                'ID Number': 'Nọmba ID',
                'Residential Address': 'Adreesị Ebe Obibi',
                'State': 'Steeti',
                'LGA': 'LGA',
                'Bank Name': 'Aha Bankị',
                'Account Number': 'Nọmba Akaụntụ',
                'Account Name': 'Aha Akaụntụ',
                'Upload ID Document': 'Bulite Akwụkwọ ID',
                'Upload Passport Photo': 'Bulite Foto Passport',
                'Save Profile Details': 'Chekwaa Nkọwa Profaịlụ',
                'Current Password': 'Paswọọdụ Ugbu A',
                'New Password': 'Paswọọdụ Ọhụrụ',
                'Confirm Password': 'Kwenye Paswọọdụ',
                'Update Password': 'Melite Paswọọdụ',
                'Done': 'Emechara',
                'Missing': 'Na-efu',
                'Install': 'Wụnye',
                'Offer': 'Nye',
                'Request': 'Rịọ',
                'Review': 'Nyochaa',
                'Back to Dashboard': 'Laghachi na Dashboard',
                'Quick Links': 'Njikọ Ngwa',
                'Legal': 'Iwu',
                'Follow Us': 'Soro Anyị',
                'Newsletter': 'Akwụkwọ Ozi'
            },
            yo: {
                'Home': 'Ile',
                'Create': 'Ṣẹda',
                'Dashboard': 'Dasibodu',
                'Support': 'Iranlọwọ',
                'Profile': 'Profaili',
                'New Agreement': 'Adehun Tuntun',
                'Logout': 'Jade',
                'Login': 'Wọle',
                'Sign Up': 'Forukọsilẹ',
                'My Dashboard': 'Dasibodu Mi',
                'User Profile': 'Profaili Olumulo',
                'Borrower & Lender': 'Oluyawo & Onigbese',
                'Lender Profile': 'Profaili Onigbese',
                'Borrower Profile': 'Profaili Oluyawo',
                'Profile Details': 'Alaye Profaili',
                'These details power both your lender and borrower profile completeness.': 'Awọn alaye wọnyi n pari profaili onigbese ati oluyawo rẹ.',
                'Change Password': 'Yi Ọrọigbaniwọle Pada',
                'Update your login password for this Lendily profile.': 'Ṣe imudojuiwọn ọrọigbaniwọle fun profaili Lendily yii.',
                'Full Name': 'Orukọ Kikun',
                'Phone Number': 'Nọmba Foonu',
                'Date of Birth': 'Ọjọ Ibi',
                'ID Number': 'Nọmba ID',
                'Residential Address': 'Adirẹsi Ibugbe',
                'State': 'Ipinlẹ',
                'LGA': 'Ijọba Ibile',
                'Bank Name': 'Orukọ Banki',
                'Account Number': 'Nọmba Akanti',
                'Account Name': 'Orukọ Akanti',
                'Upload ID Document': 'Gbe Iwe ID Sori',
                'Upload Passport Photo': 'Gbe Fọto Passport Sori',
                'Save Profile Details': 'Fi Alaye Profaili Pamọ',
                'Current Password': 'Ọrọigbaniwọle Lọwọlọwọ',
                'New Password': 'Ọrọigbaniwọle Tuntun',
                'Confirm Password': 'Jẹrisi Ọrọigbaniwọle',
                'Update Password': 'Ṣe Imudojuiwọn Ọrọigbaniwọle',
                'Done': 'Ti Pari',
                'Missing': 'Ko Si',
                'Install': 'Fi Sori Ẹrọ',
                'Offer': 'Funni',
                'Request': 'Bẹ̀rẹ̀',
                'Review': 'Ṣayẹwo',
                'Back to Dashboard': 'Pada si Dasibodu',
                'Quick Links': 'Ọna Asopọ',
                'Legal': 'Ofin',
                'Follow Us': 'Tẹle Wa',
                'Newsletter': 'Iwe Iroyin'
            }
        };
        ['ha', 'ig', 'yo'].forEach(language => {
            const map = phraseTranslations[language];
            Object.keys(map).forEach(key => {
                const lowerLeadKey = key.charAt(0).toLowerCase() + key.slice(1);
                if (!map[lowerLeadKey]) map[lowerLeadKey] = map[key];
            });
        });
        Object.assign(phraseTranslations.ha, {
            'Active': 'Mai Aiki',
            'Pending': 'Ana Jira',
            'Completed': 'An Kammala',
            'Total Records': 'Jimlar Bayanai',
            'Currently running': 'Yana gudana',
            'Awaiting review': 'Ana jiran dubawa',
            'Repaid or fulfilled': 'An biya ko an cika',
            'All agreements': 'Dukkan yarjejeniyoyi',
            'Statement': 'Bayanin Maamala',
            'Lending/Borrowing History': 'Tarihin Bayarwa/Nema',
            'Funding Mix': 'Nauin Kudade',
            'Agreement Types': 'Nauin Yarjejeniya',
            'Risk View': 'Duban Hadari',
            'Status Split': 'Rarraba Matsayi',
            'Live Agreements': 'Yarjejeniyoyi Masu Aiki',
            'Active and pending funding flows that need attention.': 'Kudade masu aiki da wadanda ake jira.',
            'Refresh': 'Sabunta',
            'Offer Funds': 'Bayar da Kudi',
            'Request Funds': 'Nemi Kudi',
            'Review Terms': 'Duba Sharudda',
            'Agreement Actions': 'Ayyukan Yarjejeniya',
            'Loan': 'Lamuni',
            'Gift': 'Kyauta',
            'Halal Loan': 'Lamunin Halal',
            'Purpose': 'Dalili',
            'Amount': 'Kudi',
            'Interest': 'Riba',
            'Total Profit': 'Jimlar Riba',
            'Status': 'Matsayi',
            'Date': 'Kwanan Wata',
            'Receipt': 'Rasit',
            'View Receipt': 'Duba Rasit',
            'Share': 'Raba',
            'Reminder': 'Tunatarwa',
            'Enforce': 'Tilasta',
            'Wallet': 'Wallet',
            'Sent': 'An Aika',
            'Received': 'An Karba'
        });
        Object.assign(phraseTranslations.ig, {
            'Active': 'Na-arụ Ọrụ',
            'Pending': 'Na-eche',
            'Completed': 'Emechara',
            'Total Records': 'Ndekọ Niile',
            'Currently running': 'Na-aga ugbu a',
            'Awaiting review': 'Na-eche nyocha',
            'Repaid or fulfilled': 'Akwụghachila ma ọ bụ mezue',
            'All agreements': 'Nkwekọrịta niile',
            'Statement': 'Nkwupụta',
            'Lending/Borrowing History': 'Akụkọ Ịgbazinye/Ịgbaziri',
            'Funding Mix': 'Ngwakọta Ego',
            'Agreement Types': 'Ụdị Nkwekọrịta',
            'Risk View': 'Nlele Ihe Ize Ndụ',
            'Status Split': 'Nkewa Ọnọdụ',
            'Live Agreements': 'Nkwekọrịta Dị Ndụ',
            'Active and pending funding flows that need attention.': 'Usoro ego na-arụ ọrụ na nke na-eche nyocha.',
            'Refresh': 'Melite',
            'Offer Funds': 'Nye Ego',
            'Request Funds': 'Rịọ Ego',
            'Review Terms': 'Nyochaa Usoro',
            'Agreement Actions': 'Omume Nkwekọrịta',
            'Loan': 'Ego Mbinye',
            'Gift': 'Onyinye',
            'Halal Loan': 'Ego Mbinye Halal',
            'Purpose': 'Ebumnuche',
            'Amount': 'Ọnụego',
            'Interest': 'Ọmụrụnwa',
            'Total Profit': 'Uru Niile',
            'Status': 'Ọnọdụ',
            'Date': 'Ụbọchị',
            'Receipt': 'Rịsit',
            'View Receipt': 'Lee Rịsit',
            'Share': 'Kekọrịta',
            'Reminder': 'Ncheta',
            'Enforce': 'Mee Ka O Rube Isi',
            'Wallet': 'Wallet',
            'Sent': 'Ezigara',
            'Received': 'Anatara'
        });
        Object.assign(phraseTranslations.yo, {
            'Active': 'Nṣiṣẹ',
            'Pending': 'Nduro',
            'Completed': 'Ti Pari',
            'Total Records': 'Gbogbo Igbasilẹ',
            'Currently running': 'Nṣiṣẹ lọwọlọwọ',
            'Awaiting review': 'Nduro fun ayẹwo',
            'Repaid or fulfilled': 'Ti san pada tabi pari',
            'All agreements': 'Gbogbo adehun',
            'Statement': 'Gbólóhùn',
            'Lending/Borrowing History': 'Itan Fifun/Gbigba Yawo',
            'Funding Mix': 'Apapọ Iru Owo',
            'Agreement Types': 'Iru Adehun',
            'Risk View': 'Wiwo Ewu',
            'Status Split': 'Pinpin Ipo',
            'Live Agreements': 'Awọn Adehun To Nṣiṣẹ',
            'Active and pending funding flows that need attention.': 'Awọn adehun to n ṣiṣẹ ati ti nduro fun akiyesi.',
            'Refresh': 'Tunse',
            'Offer Funds': 'Funni ni Owo',
            'Request Funds': 'Beere Owo',
            'Review Terms': 'Ṣayẹwo Awọn Ofin',
            'Agreement Actions': 'Awọn Iṣe Adehun',
            'Loan': 'Awin',
            'Gift': 'Ẹbun',
            'Halal Loan': 'Awin Halal',
            'Purpose': 'Idi',
            'Amount': 'Iye',
            'Interest': 'Ere',
            'Total Profit': 'Lapapọ Ere',
            'Status': 'Ipo',
            'Date': 'Ọjọ',
            'Receipt': 'Risiti',
            'View Receipt': 'Wo Risiti',
            'Share': 'Pin',
            'Reminder': 'Iranti',
            'Enforce': 'Fi Le Lọwọ',
            'Wallet': 'Wallet',
            'Sent': 'Ti Firanṣẹ',
            'Received': 'Ti Gba'
        });
        const translatePhrase = (value) => currentLanguage === 'en'
            ? value
            : (phraseTranslations[currentLanguage]?.[value] || value);

        // --- MOCK DATA ---
        const testimonials = [
            {
                name: 'Tunde O.',
                role: 'Small Business Owner',
                quote: 'I stopped sending money by chat alone. Now even urgent 2k has a record, due date, and receipt before I transfer.',
                avatar: 'https://i.pravatar.cc/100?u=tunde'
            },
            {
                name: 'Aisha B.',
                role: 'Private Lender',
                quote: 'People used to say I never helped them. Lendily shows every gift and every loan, so nobody can rewrite the story later.',
                avatar: 'https://i.pravatar.cc/100?u=aisha'
            },
            {
                name: 'Chinedu E.',
                role: 'Freelancer',
                quote: 'For halal funding, I can use markup terms instead of interest language. The agreement is clear before the other person accepts.',
                avatar: 'https://i.pravatar.cc/100?u=chinedu'
            },
            {
                name: 'Maryam K.',
                role: 'Kaduna Trader',
                quote: 'I gave someone market money and used Lendily to record the markup clearly. It felt cleaner and everybody accepted the terms first.',
                avatar: 'https://i.pravatar.cc/100?u=maryam'
            },
            {
                name: 'Emeka N.',
                role: 'POS Agent',
                quote: 'Those small urgent requests add up fast. The dashboard showed me who still owed me and who I helped as a gift.',
                avatar: 'https://i.pravatar.cc/100?u=emeka'
            },
            {
                name: 'Fatima S.',
                role: 'Private Lender',
                quote: 'I like that borrowers can request with my Lendily ID, but I still approve, reject, or counter before anything becomes official.',
                avatar: 'https://i.pravatar.cc/100?u=fatima'
            },
            {
                name: 'Bola A.',
                role: 'Salary Earner',
                quote: 'Family loans used to be awkward. Now I send the agreement link first, and everyone knows if it is a loan or a gift.',
                avatar: 'https://i.pravatar.cc/100?u=bola'
            },
            {
                name: 'Ibrahim J.',
                role: 'Halal Finance User',
                quote: 'The halal loan option helped me avoid interest wording while still recording my profit and repayment plan.',
                avatar: 'https://i.pravatar.cc/100?u=ibrahim'
            },
            {
                name: 'Grace U.',
                role: 'Small Business Owner',
                quote: 'When someone said I never helped them, I had the gift record. That alone made Lendily worth using.',
                avatar: 'https://i.pravatar.cc/100?u=grace'
            },
            {
                name: 'Seyi M.',
                role: 'Cooperative Treasurer',
                quote: 'Our thrift group now records who collected money, the repayment date, and the agreed amount before cash leaves the account.',
                avatar: 'https://i.pravatar.cc/100?u=seyi'
            },
            {
                name: 'Ngozi P.',
                role: 'Online Vendor',
                quote: 'I used to mix customer credit with personal loans. Lendily helped me separate business support from gifts and repayments.',
                avatar: 'https://i.pravatar.cc/100?u=ngozi'
            },
            {
                name: 'Ahmed R.',
                role: 'Phone Dealer',
                quote: 'For asset sales, I can write the installment terms clearly and keep the buyer acceptance in one place.',
                avatar: 'https://i.pravatar.cc/100?u=ahmed'
            },
            {
                name: 'Kemi F.',
                role: 'HR Consultant',
                quote: 'I helped a colleague with rent and used Lendily to make the repayment plan clear without making the conversation tense.',
                avatar: 'https://i.pravatar.cc/100?u=kemi'
            },
            {
                name: 'Victor I.',
                role: 'Transport Operator',
                quote: 'The reminders made a big difference. I did not have to keep calling; the agreement already showed what was due.',
                avatar: 'https://i.pravatar.cc/100?u=victor'
            },
            {
                name: 'Zainab L.',
                role: 'Fashion Designer',
                quote: 'When I gave fabric money on credit, I recorded it as a loan and attached the due date before delivery.',
                avatar: 'https://i.pravatar.cc/100?u=zainab'
            },
            {
                name: 'Daniel C.',
                role: 'Community Lender',
                quote: 'Counter offers saved me from accepting terms that did not work. We agreed on a better date before approving the request.',
                avatar: 'https://i.pravatar.cc/100?u=daniel'
            },
            {
                name: 'Rukayat T.',
                role: 'Market Supplier',
                quote: 'I like seeing loan, gift, and halal records together. It tells me exactly how I have supported people this month.',
                avatar: 'https://i.pravatar.cc/100?u=rukayat'
            }
        ];

        let loans = [
            { id: 'LN001', lender: 'Jane Doe', lenderEmail: 'jane.doe@example.com', lenderPhone: '+2348012345678', borrower: 'Mike Ross', borrowerId: 'BR-MIKE', borrowerPin: '1234', amount: 75000, dueDate: '2026-08-15', interestRate: 8, interestPeriod: 'period', fundingType: 'halal', loanPurpose: 'business', transactionDetails: 'Business stock purchase with fixed disclosed markup.', repaymentPlan: 'end_of_term', status: 'pending_borrower_acceptance', initiatedBy: 'lender', showLenderDetails: true },
            { id: 'LN002', lender: 'Jane Doe', lenderEmail: 'jane.doe@example.com', lenderPhone: '+2348012345678', borrower: 'Harvey Specter', amount: 250000, dueDate: '2026-07-20', interestRate: 10, interestPeriod: 'monthly', fundingType: 'loan', loanPurpose: 'business', transactionDetails: 'Short-term business working capital.', repaymentPlan: 'end_of_term', status: 'active', initiatedBy: 'lender', showLenderDetails: false },
            { id: 'LN003', lender: 'John Wick', lenderEmail: 'john.w@example.com', lenderPhone: '+2349011112222', borrower: 'Jane Doe', amount: 50000, dueDate: null, interestRate: 0, interestPeriod: 'period', fundingType: 'gift', loanPurpose: 'emergency', transactionDetails: 'Emergency support gift with no repayment expected.', repaymentPlan: null, status: 'repaid', initiatedBy: 'lender', showLenderDetails: true },
            { id: 'LN004', lender: 'Ada Lovelace', lenderEmail: 'ada.l@example.com', lenderPhone: '+2348033334444', borrower: 'Jane Doe', amount: 120000, dueDate: '2026-05-10', interestRate: 6, interestPeriod: 'period', fundingType: 'halal', loanPurpose: 'asset_purchase', transactionDetails: 'Laptop purchase under halal loan markup terms.', repaymentPlan: 'monthly', status: 'defaulted', initiatedBy: 'borrower', showLenderDetails: false },
            { id: 'LN005', lender: 'Jane Doe', lenderEmail: 'jane.doe@example.com', lenderPhone: '+2348012345678', borrower: 'Mike Ross', borrowerId: 'BR-MIKE', borrowerPin: '1234', amount: 90000, dueDate: '2026-09-01', interestRate: 0, interestPeriod: 'period', fundingType: 'loan', loanPurpose: 'rent', transactionDetails: 'Rent support requested for September.', repaymentPlan: 'monthly', status: 'pending_lender_acceptance', initiatedBy: 'borrower', showLenderDetails: true },
            { id: 'LN006', lender: 'Jane Doe', lenderEmail: 'jane.doe@example.com', lenderPhone: '+2348012345678', borrower: 'Rachel Zane', borrowerId: 'BR-RACHEL', borrowerPin: '2468', amount: 65000, dueDate: '2026-08-02', interestRate: 4, interestPeriod: 'period', fundingType: 'loan', loanPurpose: 'education', transactionDetails: 'Certification course support with one-time repayment.', repaymentPlan: 'end_of_term', status: 'pending_lender_acceptance', initiatedBy: 'borrower', showLenderDetails: true },
            { id: 'LN007', lender: 'Peter Obi', lenderEmail: 'peter.o@example.com', lenderPhone: '+2348022223333', borrower: 'Jane Doe', amount: 150000, dueDate: '2026-10-10', interestRate: 7, interestPeriod: 'monthly', fundingType: 'loan', loanPurpose: 'business', transactionDetails: 'Inventory financing request awaiting borrower confirmation.', repaymentPlan: 'monthly', status: 'pending_borrower_acceptance', initiatedBy: 'lender', showLenderDetails: true },
            { id: 'LN008', lender: 'Jane Doe', lenderEmail: 'jane.doe@example.com', lenderPhone: '+2348012345678', borrower: 'Damilola King', borrowerId: 'BR-DAMI', borrowerPin: '3579', amount: 30000, dueDate: null, interestRate: 0, interestPeriod: 'period', fundingType: 'gift', loanPurpose: 'medical', transactionDetails: 'Medical support requested as a gift record.', repaymentPlan: null, status: 'pending_lender_acceptance', initiatedBy: 'borrower', showLenderDetails: true },
            { id: 'LN009', lender: 'Aisha Bello', lenderEmail: 'aisha.b@example.com', lenderPhone: '+2348055556666', borrower: 'Jane Doe', amount: 220000, dueDate: '2026-11-20', interestRate: 12, interestPeriod: 'period', fundingType: 'halal', loanPurpose: 'asset_purchase', transactionDetails: 'Generator purchase with disclosed halal markup.', repaymentPlan: 'monthly', status: 'pending_borrower_acceptance', initiatedBy: 'lender', showLenderDetails: false },
            { id: 'LN010', lender: 'Jane Doe', lenderEmail: 'jane.doe@example.com', lenderPhone: '+2348012345678', borrower: 'Tony Stark', borrowerId: 'BR-TONY', borrowerPin: '0007', amount: 180000, dueDate: '2026-12-01', interestRate: 5, interestPeriod: 'weekly', fundingType: 'loan', loanPurpose: 'business', transactionDetails: 'Short bridge funding for supply delivery.', repaymentPlan: 'weekly', status: 'pending_lender_acceptance', initiatedBy: 'borrower', showLenderDetails: true },
        ];

        const socialProofMessages = [
            { text: 'A user just protected urgent N2k', detail: 'Small loan recorded before transfer', icon: 'shield-check' },
            { text: 'A user just got a loan of N200k', detail: 'Private funding approved with proof', icon: 'hand-coins' },
            { text: 'A user just recorded free money', detail: 'Gift support saved as gift', icon: 'gift' },
            { text: 'Someone in Kaduna just secured a loan', detail: 'Agreement accepted by both sides', icon: 'badge-check' },
            { text: 'Someone in Jos just protected their loan', detail: 'Lendily receipt created', icon: 'shield-check' },
            { text: 'A lender in Abuja just stopped story change', detail: 'Purpose and repayment terms locked', icon: 'send' },
            { text: 'A halal markup deal was just accepted', detail: 'Profit recorded without interest wording', icon: 'landmark' },
            { text: 'Someone in Lagos just checked Abegistan records', detail: 'Total help records updated', icon: 'chart-line' },
            { text: 'A borrower just completed repayment', detail: 'Agreement marked healthy', icon: 'check-circle-2' }
        ];
        let socialProofIndex = 0;
        let socialProofTimer = null;

        const heroSlides = [
            {
                kicker: 'Stop lending money on vibes',
                title: 'Before you send that urgent 2k, <span class="gradient-text">record it on Lendily.</span>',
                subtitle: 'Friends, family, colleagues, and Abegistan people will still ask for help. Lendily gives you proof: loan terms, gift records, halal markup profit, repayment plans, acceptance, and receipts before money leaves your hand.',
                primary: 'Protect Money Now',
                secondary: 'See Help Records'
            },
            {
                kicker: 'For Abegistan and urgent money requests',
                title: 'Know exactly how much <span class="gradient-text">you have helped people.</span>',
                subtitle: 'Track urgent 2k, 5k, rent support, hospital money, business capital, and gifts in one place, so nobody can later say you never showed up for them.',
                primary: 'Record a Loan',
                secondary: 'View Dashboard'
            },
            {
                kicker: 'Lend like you want your money back',
                title: 'No more “I thought it was dash” <span class="gradient-text">after repayment day.</span>',
                subtitle: 'Let the borrower accept the amount, purpose, due date, repayment plan, and terms before you transfer. Lendily keeps the receipt ready for reminders and recovery steps.',
                primary: 'Create Agreement',
                secondary: 'Review Terms'
            },
            {
                kicker: 'Gift records matter too',
                title: 'When you give free money, <span class="gradient-text">keep proof of kindness.</span>',
                subtitle: 'Gift mode removes repayment and interest, but still records who you helped, why you helped, and how much support you gave.',
                primary: 'Send Gift Record',
                secondary: 'See Gift Records'
            },
            {
                kicker: 'Halal profit for private funding',
                title: 'Make clear markup profit <span class="gradient-text">without haram interest wording.</span>',
                subtitle: 'Use the Halal Loan flow to set disclosed markup terms, acceptance, repayment plan, and receipts for individual funding.',
                primary: 'Start Halal Loan',
                secondary: 'Open Dashboard'
            }
        ];
        let heroSlideIndex = 0;
        let heroSlideTimer = null;

        // --- UTILITIES ---

        const showToast = (message, type = 'info') => {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            const iconName = { success: 'check-circle', error: 'x-circle', info: 'info' }[type];
            toast.innerHTML = `<i data-lucide="${iconName}" class="w-6 h-6 mr-3"></i> <p>${message}</p>`;
            container.appendChild(toast);
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            setTimeout(() => { toast.remove(); }, 4000);
        };

        let transientErrorTimer = null;
        const showTransientErrorModal = (message, title = 'Action needed', options = {}) => {
            const modal = document.getElementById('transient-error-modal');
            const titleNode = document.getElementById('transient-error-title');
            const copyNode = document.getElementById('transient-error-copy');
            if (!modal || !titleNode || !copyNode) {
                showToast(message, 'error');
                return;
            }

            titleNode.textContent = title;
            copyNode.textContent = message;
            modal.classList.add('is-visible');
            if (typeof lucide !== 'undefined') lucide.createIcons();
            clearTimeout(transientErrorTimer);
            transientErrorTimer = setTimeout(() => {
                modal.classList.remove('is-visible');
                options.afterDismiss?.();
            }, options.duration || 2600);
        };

        const showSocialProof = () => {
            const container = document.getElementById('social-proof-container');
            if (!container || document.hidden || document.body.classList.contains('dashboard-page')) return;

            const message = socialProofMessages[socialProofIndex % socialProofMessages.length];
            socialProofIndex += 1;
            const card = document.createElement('div');
            card.className = 'social-proof-card';
            card.innerHTML = `
                <div class="social-proof-icon"><i data-lucide="${message.icon}" class="w-5 h-5"></i></div>
                <p><strong>${message.text}</strong><span>${message.detail}</span></p>
            `;
            container.prepend(card);
            while (container.children.length > 2) {
                container.lastElementChild.remove();
            }
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            setTimeout(() => card.remove(), 5600);
        };

        const startSocialProofFeed = () => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            clearInterval(socialProofTimer);
            setTimeout(showSocialProof, 1800);
            socialProofTimer = setInterval(showSocialProof, 7800);
        };

        const renderHeroSlide = (index, animate = true) => {
            const copy = document.getElementById('hero-copy');
            const kicker = document.querySelector('#hero-kicker span');
            const title = document.getElementById('hero-title');
            const subtitle = document.getElementById('hero-subtitle');
            const primary = document.getElementById('hero-primary-cta');
            const secondary = document.getElementById('hero-secondary-cta');
            const dots = document.querySelectorAll('.hero-slide-dot');
            if (!copy || !kicker || !title || !subtitle || !primary || !secondary) return;

            const slide = heroSlides[index % heroSlides.length];
            const update = () => {
                kicker.textContent = slide.kicker;
                title.innerHTML = slide.title;
                subtitle.textContent = slide.subtitle;
                primary.textContent = slide.primary;
                secondary.textContent = slide.secondary;
                dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === index));
                copy.classList.remove('is-changing');
            };

            if (!animate) {
                update();
                return;
            }

            copy.classList.add('is-changing');
            setTimeout(update, 260);
        };

        const startHeroSlides = () => {
            const dotsContainer = document.getElementById('hero-slide-dots');
            if (!dotsContainer) return;

            dotsContainer.innerHTML = heroSlides.map((_, index) => (
                `<button type="button" class="hero-slide-dot${index === 0 ? ' active' : ''}" aria-label="Show hero message ${index + 1}" data-slide-index="${index}"></button>`
            )).join('');

            dotsContainer.addEventListener('click', (event) => {
                const dot = event.target.closest('.hero-slide-dot');
                if (!dot) return;
                heroSlideIndex = parseInt(dot.dataset.slideIndex, 10);
                renderHeroSlide(heroSlideIndex);
                clearInterval(heroSlideTimer);
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    heroSlideTimer = setInterval(() => {
                        heroSlideIndex = (heroSlideIndex + 1) % heroSlides.length;
                        renderHeroSlide(heroSlideIndex);
                    }, 6200);
                }
            });

            renderHeroSlide(0, false);
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                heroSlideTimer = setInterval(() => {
                    heroSlideIndex = (heroSlideIndex + 1) % heroSlides.length;
                    renderHeroSlide(heroSlideIndex);
                }, 6200);
            }
        };

        const registerPwa = () => {
            if ('serviceWorker' in navigator && ['http:', 'https:'].includes(window.location.protocol)) {
                navigator.serviceWorker.register('./service-worker.js')
                    .catch(() => showToast('Offline mode could not be enabled in this browser.', 'info'));
            }

            const installButton = document.getElementById('install-app-btn');
            let installPromptTimer = null;
            let installPromptHideTimer = null;
            const hideInstallPrompt = () => installButton?.classList.remove('is-visible');
            const showInstallPrompt = () => {
                if (!installButton || !deferredInstallPrompt) return;
                installButton.classList.remove('hidden');
                installButton.classList.add('install-slide-prompt');
                requestAnimationFrame(() => installButton.classList.add('is-visible'));
                clearTimeout(installPromptHideTimer);
                installPromptHideTimer = setTimeout(hideInstallPrompt, 4200);
            };
            const stopInstallPrompt = () => {
                clearInterval(installPromptTimer);
                clearTimeout(installPromptHideTimer);
                installPromptTimer = null;
                installButton?.classList.remove('is-visible', 'install-slide-prompt');
                installButton?.classList.add('hidden');
            };
            window.addEventListener('beforeinstallprompt', (event) => {
                event.preventDefault();
                deferredInstallPrompt = event;
                showInstallPrompt();
                if (!installPromptTimer) installPromptTimer = setInterval(showInstallPrompt, 9500);
            });

            installButton?.addEventListener('click', async () => {
                if (!deferredInstallPrompt) {
                    showToast('Install is available when Lendily is opened from localhost or HTTPS.', 'info');
                    return;
                }

                deferredInstallPrompt.prompt();
                await deferredInstallPrompt.userChoice;
                deferredInstallPrompt = null;
                stopInstallPrompt();
            });

            window.addEventListener('appinstalled', () => {
                deferredInstallPrompt = null;
                stopInstallPrompt();
                showToast('Lendily installed.', 'success');
            });
        };

        const formatCurrency = (amount) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
        const formatDate = (dateString) => dateString
            ? new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
            : 'Not applicable';
        const parseCurrencyAmount = (value) => parseFloat(String(value || '').replace(/,/g, ''));
        const formatAmountValue = (value) => {
            const cleaned = String(value || '').replace(/[^\d.]/g, '');
            const [wholePart, decimalPart] = cleaned.split('.');
            const formattedWhole = wholePart ? new Intl.NumberFormat('en-US').format(parseInt(wholePart, 10)) : '';
            if (decimalPart !== undefined) return `${formattedWhole}.${decimalPart.slice(0, 2)}`;
            return formattedWhole;
        };

        const calculateFundingCharge = (loan) => {
            if (loan.fundingType === 'gift') return 0;

            const principal = loan.amount;
            const rate = (loan.interestRate || 0) / 100;

            if (loan.fundingType === 'halal' || loan.interestPeriod === 'period') {
                return principal * rate;
            }

            const startDate = new Date();
            const endDate = new Date(loan.dueDate);
            const durationInDays = Math.max((endDate - startDate) / (1000 * 60 * 60 * 24), 0);

            switch (loan.interestPeriod) {
                case 'daily':
                    return principal * rate * durationInDays;
                case 'weekly':
                    return principal * rate * (durationInDays / 7);
                case 'monthly':
                    return principal * rate * (durationInDays / 30.44);
                case 'annually':
                    return principal * rate * (durationInDays / 365.25);
                default:
                    return principal * rate;
            }
        };

        const calculateTotalRepayment = (loan) => {
            if (loan.fundingType === 'gift') return 0;
            return loan.amount + calculateFundingCharge(loan);
        };

        const getInterestUnitsForPeriod = (loan) => {
            if (loan.fundingType === 'halal' || loan.interestPeriod === 'period') return 1;
            const endDate = new Date(loan.dueDate);
            const durationInDays = Math.max((endDate - new Date()) / (1000 * 60 * 60 * 24), 0);
            if (!Number.isFinite(durationInDays) || durationInDays <= 0) return 1;
            if (loan.interestPeriod === 'daily') return durationInDays;
            if (loan.interestPeriod === 'weekly') return durationInDays / 7;
            if (loan.interestPeriod === 'monthly') return durationInDays / 30.44;
            if (loan.interestPeriod === 'annually') return durationInDays / 365.25;
            return 1;
        };

        const calculateRateFromExpectedProfit = (loan, expectedProfit) => {
            if (loan.fundingType === 'gift' || !loan.amount || loan.amount <= 0) return 0;
            const units = getInterestUnitsForPeriod(loan);
            return units > 0 ? (expectedProfit / (loan.amount * units)) * 100 : 0;
        };

        const getFundingLabel = (loan) => ({
            loan: 'Loan',
            gift: 'Gift',
            halal: 'Halal Loan'
        }[loan.fundingType] || 'Loan');

        const getPurposeLabel = (purpose) => ({
            personal: 'Personal',
            business: 'Business',
            education: 'Education',
            medical: 'Medical',
            rent: 'Rent',
            asset_purchase: 'Asset Purchase',
            emergency: 'Emergency',
            other: 'Other'
        }[purpose] || 'Other');

        const getPurposeFieldLabel = (loan) => loan.fundingType === 'gift' ? 'Gift Purpose' : 'Purpose';
        const getDisplayTotal = (loan) => loan.fundingType === 'gift' ? loan.amount : calculateTotalRepayment(loan);
        const getTransactionDate = (loan, fallbackOffset = 0) => {
            const source = loan.createdAt || loan.disbursedDate || loan.dueDate;
            if (source) return source;
            const date = new Date();
            date.setDate(date.getDate() - fallbackOffset);
            return date.toISOString().slice(0, 10);
        };
        const getDisbursedDate = (loan) => loan.disbursedDate || (loan.status === 'active' || loan.status === 'repaid' ? getTransactionDate(loan) : null);
        const getReimbursedDate = (loan) => loan.reimbursedDate || (loan.status === 'repaid' ? loan.dueDate : null);
        const getRepaymentDate = (loan) => loan.fundingType === 'gift' ? null : loan.dueDate;
        const getInterestDisplay = (loan) => loan.fundingType === 'gift' ? 'Not applicable' : `${loan.interestRate || 0}%`;
        const getTotalProfit = (loan) => loan.fundingType === 'gift' ? 0 : calculateFundingCharge(loan);
        const getFirstLastName = (name) => {
            const parts = cleanText(name || '').split(/\s+/).filter(Boolean);
            if (parts.length <= 2) return parts.join(' ') || 'Unknown';
            return `${parts[0]} ${parts[parts.length - 1]}`;
        };
        const setFaceVerificationStatus = (state, message) => {
            const status = document.getElementById('faceVerificationStatus');
            const hint = document.getElementById('faceVerificationHint');
            if (!status) return;
            const icon = state === 'verified' ? 'badge-check' : state === 'failed' ? 'triangle-alert' : 'scan-face';
            status.className = `face-status-pill ${state === 'verified' ? 'verified' : state === 'failed' ? 'failed' : ''}`;
            status.innerHTML = `<i data-lucide="${icon}" class="w-4 h-4"></i> ${message}`;
            if (hint) hint.textContent = message;
            if (typeof lucide !== 'undefined') lucide.createIcons();
        };

        const applyLanguage = (language) => {
            currentLanguage = translations[language] ? language : 'en';
            document.documentElement.lang = currentLanguage;
            document.querySelectorAll('[data-l10n-source]').forEach(node => {
                node.textContent = node.dataset.l10nSource;
            });
            document.querySelectorAll('[data-l10n-placeholder]').forEach(node => {
                node.setAttribute('placeholder', node.dataset.l10nPlaceholder);
            });
            document.querySelectorAll('[data-i18n]').forEach(node => {
                node.textContent = t(node.dataset.i18n);
            });
            document.querySelectorAll('#language-selector, #mobile-language-selector').forEach(select => {
                select.value = currentLanguage;
            });
            translateStaticContent();
            setText('interestRateLabel', t(document.getElementById('fundingType')?.value === 'halal' ? 'form.markup' : 'form.interestRate'));
            setText('requestInterestRateLabel', t(document.getElementById('requestFundingType')?.value === 'halal' ? 'form.markup' : 'form.interestRate'));
            setText('profitExpectedLabel', t('form.profitExpected'));
            setText('requestProfitExpectedLabel', t('form.profitExpected'));
            document.querySelector('#new-loan-form button[type="submit"]') && (document.querySelector('#new-loan-form button[type="submit"]').textContent = t('form.createOffer'));
            document.querySelector('#request-loan-form button[type="submit"]') && (document.querySelector('#request-loan-form button[type="submit"]').textContent = t('form.sendRequest'));
            document.querySelectorAll('.dashboard-action-btn').forEach(button => {
                const href = button.getAttribute('href');
                if (href === '#new-loan') button.textContent = t('actions.offer');
                if (href === '#request-loan') button.textContent = t('actions.request');
                if (href === '#accept-loan') button.textContent = t('actions.review');
            });
            updateAuthUI();
            translateStaticContent();
            if (document.getElementById('profile')?.classList.contains('active') && loggedIn) renderProfile();
            if (document.getElementById('dashboard')?.classList.contains('active') && loggedIn) renderDashboard();
            translateStaticContent();
            if (typeof lucide !== 'undefined') lucide.createIcons();
        };

        const translateStaticContent = () => {
            const ignoredTags = new Set(['SCRIPT', 'STYLE', 'SVG', 'PATH', 'I', 'OPTION']);
            document.querySelectorAll('body *').forEach(node => {
                if (ignoredTags.has(node.tagName)) return;
                if (node.children.length === 0) {
                    const currentText = node.textContent.trim();
                    let original = node.dataset.l10nSource || currentText;
                    if (node.dataset.l10nSource && currentText && currentText !== original && currentText !== translatePhrase(original)) {
                        original = currentText;
                    }
                    if (!original) return;
                    node.dataset.l10nSource = original;
                    node.textContent = translatePhrase(original);
                }
                if (node.hasAttribute('placeholder')) {
                    const placeholder = node.dataset.l10nPlaceholder || node.getAttribute('placeholder');
                    node.dataset.l10nPlaceholder = placeholder;
                    node.setAttribute('placeholder', translatePhrase(placeholder));
                }
            });
        };

        const setupLanguageControls = () => {
            document.querySelectorAll('#language-selector, #mobile-language-selector').forEach(select => {
                select.addEventListener('change', (event) => applyLanguage(event.target.value));
            });
            applyLanguage(currentLanguage);
        };

        const getCreditScoreDetails = (loansForUser) => {
            const completed = loansForUser.filter(loan => loan.status === 'repaid').length;
            const active = loansForUser.filter(loan => loan.status === 'active').length;
            const pending = loansForUser.filter(loan => loan.status?.includes('pending')).length;
            const defaulted = loansForUser.filter(loan => loan.status === 'defaulted').length;
            const profileBonus = getProfileCompleteness(currentUser, 'borrower').percent >= 100 ? 35 : 0;
            const score = Math.max(300, Math.min(850, 520 + completed * 55 + active * 24 + pending * 8 + profileBonus - defaulted * 95));
            const tier = score >= 760 ? 'Prime' : score >= 680 ? 'Strong' : score >= 600 ? 'Fair' : 'Building';
            const percent = Math.round(((score - 300) / 550) * 100);
            return { score, tier, percent, completed, active, pending };
        };
        const getAgreementQrUrl = (loan) => `https://api.qrserver.com/v1/create-qr-code/?size=112x112&margin=8&data=${encodeURIComponent(`Lendily:${loan.id}:${loan.borrower || ''}:${loan.amount || 0}`)}`;
        const encodeBase64Url = (value) => btoa(unescape(encodeURIComponent(value)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/g, '');
        const decodeBase64Url = (value) => {
            const normalized = String(value || '').replace(/-/g, '+').replace(/_/g, '/');
            return decodeURIComponent(escape(atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '='))));
        };
        const getUserQrPayload = (user = currentUser) => {
            const firstName = cleanText(user?.name || 'User').split(/\s+/)[0]?.toUpperCase() || 'USER';
            return {
                type: 'lendily-user-v1',
                name: user?.name || '',
                email: user?.email || '',
                phone: user?.phone || '',
                lendilyId: user?.lendilyId || `LN-${firstName}`,
                borrowerId: user?.borrowerId || `BR-${firstName}`,
                bankName: user?.bankName || '',
                accountNumber: user?.accountNumber || '',
                accountName: user?.accountName || user?.name || '',
                state: user?.state || '',
                lga: user?.lga || ''
            };
        };
        const getUserQrText = (user = currentUser) => `LENDILY_USER:${encodeBase64Url(JSON.stringify(getUserQrPayload(user)))}`;
        const getUserQrUrl = (user = currentUser) => `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=${encodeURIComponent(getUserQrText(user))}`;
        const remoteImageToDataUrl = async (url) => {
            const response = await fetch(url, { mode: 'cors' });
            if (!response.ok) throw new Error('QR image download failed.');
            const blob = await response.blob();
            return await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        };
        const getUserQrDataUrl = async (user = currentUser, width = 360) => {
            const payload = getUserQrText(user);
            if (window.QRCode?.toDataURL) {
                return window.QRCode.toDataURL(payload, {
                    width,
                    margin: 2,
                    color: { dark: '#0f172a', light: '#ffffff' },
                    errorCorrectionLevel: 'M'
                });
            }
            return remoteImageToDataUrl(getUserQrUrl(user).replace('size=220x220', `size=${width}x${width}`));
        };
        const decodeLendilyQrText = (rawValue = '') => {
            const value = String(rawValue || '').trim();
            if (!value) return null;
            try {
                if (value.startsWith('LENDILY_USER:')) {
                    return JSON.parse(decodeBase64Url(value.replace('LENDILY_USER:', '')));
                }
                if (value.startsWith('{')) return JSON.parse(value);
                if (/^LN-[A-Z0-9-]{2,}$/i.test(value)) return { type: 'lendily-user-v1', lendilyId: normalizeLendilyId(value) };
                if (/^BR-[A-Z0-9-]{2,}$/i.test(value)) return { type: 'lendily-user-v1', borrowerId: normalizeBorrowerId(value) };
            } catch (error) {
                console.warn('Could not decode Lendily QR payload.', error);
            }
            return null;
        };
        const ensureCurrentUserQrIdentity = () => {
            if (!currentUser) return;
            const firstName = cleanText(currentUser.name || 'User').split(/\s+/)[0]?.toUpperCase() || 'USER';
            currentUser.lendilyId = currentUser.lendilyId || `LN-${firstName}`;
            currentUser.borrowerId = currentUser.borrowerId || `BR-${firstName}`;
            currentUser.qrPayload = getUserQrText(currentUser);
        };
        const readFileAsDataUrl = (file) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
        const loadImageElement = (src) => new Promise((resolve, reject) => {
            const image = new Image();
            if (/^https?:\/\//i.test(src)) image.crossOrigin = 'anonymous';
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = src;
        });
        const waitForFaceApi = async (timeoutMs = 5000) => {
            const startedAt = Date.now();
            while (!window.faceapi?.nets?.tinyFaceDetector && Date.now() - startedAt < timeoutMs) {
                await new Promise(resolve => setTimeout(resolve, 150));
            }
            return Boolean(window.faceapi?.nets?.tinyFaceDetector);
        };
        const loadFaceDetectionModels = async () => {
            if (!await waitForFaceApi()) return false;
            if (!loadFaceDetectionModels.ready) {
                await window.faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/');
                loadFaceDetectionModels.ready = true;
            }
            return true;
        };
        const imageHasFace = async (dataUrl) => {
            const image = await loadImageElement(dataUrl);
            try {
                if (await loadFaceDetectionModels()) {
                    const result = await window.faceapi.detectSingleFace(
                        image,
                        new window.faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.45 })
                    );
                    return Boolean(result);
                }
            } catch (error) {
                console.warn('Face API image check failed, trying native detector.', error);
            }
            if ('FaceDetector' in window) {
                const detector = new window.FaceDetector({ fastMode: true, maxDetectedFaces: 1 });
                const faces = await detector.detect(image);
                return faces.length > 0;
            }
            return false;
        };
        const drawRoundRect = (ctx, x, y, width, height, radius) => {
            const r = Math.min(radius, width / 2, height / 2);
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.arcTo(x + width, y, x + width, y + height, r);
            ctx.arcTo(x + width, y + height, x, y + height, r);
            ctx.arcTo(x, y + height, x, y, r);
            ctx.arcTo(x, y, x + width, y, r);
            ctx.closePath();
        };
        const downloadCurrentUserQrCard = async () => {
            if (!currentUser) return;
            ensureCurrentUserQrIdentity();
            const canvas = document.createElement('canvas');
            canvas.width = 1080;
            canvas.height = 680;
            const ctx = canvas.getContext('2d');
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#08111f');
            gradient.addColorStop(0.52, '#0f2f74');
            gradient.addColorStop(1, '#2563eb');
            ctx.fillStyle = gradient;
            drawRoundRect(ctx, 0, 0, canvas.width, canvas.height, 44);
            ctx.fill();

            ctx.strokeStyle = 'rgba(255,255,255,0.12)';
            ctx.lineWidth = 2;
            for (let i = -240; i < canvas.width; i += 86) {
                ctx.beginPath();
                ctx.moveTo(i, canvas.height);
                ctx.lineTo(i + 620, 0);
                ctx.stroke();
            }

            ctx.fillStyle = 'rgba(255,255,255,0.08)';
            ctx.font = '900 220px Inter, Arial, sans-serif';
            ctx.fillText('L', 795, 525);

            ctx.fillStyle = '#ffffff';
            ctx.font = '900 42px Inter, Arial, sans-serif';
            ctx.fillText('LENDILY', 72, 88);
            ctx.font = '900 64px Inter, Arial, sans-serif';
            ctx.fillText(currentUser.name || 'Lendily User', 72, 190);
            ctx.fillStyle = 'rgba(255,255,255,0.72)';
            ctx.font = '700 30px Inter, Arial, sans-serif';
            ctx.fillText(currentUser.lendilyId || 'LN-USER', 72, 246);
            ctx.fillText(currentUser.borrowerId || 'BR-USER', 72, 292);

            let qrImage;
            try {
                qrImage = await loadImageElement(await getUserQrDataUrl(currentUser, 360));
            } catch (error) {
                console.warn('QR card image generation failed.', error);
                showToast('QR card could not be generated. Downloading QR image instead.', 'info');
                const fallbackLink = document.createElement('a');
                fallbackLink.download = `${(currentUser.lendilyId || 'lendily').toLowerCase()}-qr.png`;
                fallbackLink.href = getUserQrUrl(currentUser);
                fallbackLink.target = '_blank';
                fallbackLink.rel = 'noopener noreferrer';
                fallbackLink.click();
                return;
            }
            ctx.fillStyle = '#ffffff';
            drawRoundRect(ctx, 710, 76, 280, 280, 28);
            ctx.fill();
            ctx.drawImage(qrImage, 735, 101, 230, 230);

            if (currentUser.passportPhotoDataUrl) {
                const avatar = await loadImageElement(currentUser.passportPhotoDataUrl);
                ctx.save();
                ctx.beginPath();
                ctx.arc(138, 446, 58, 0, Math.PI * 2);
                ctx.clip();
                ctx.drawImage(avatar, 80, 388, 116, 116);
                ctx.restore();
                ctx.strokeStyle = 'rgba(255,255,255,0.75)';
                ctx.lineWidth = 6;
                ctx.beginPath();
                ctx.arc(138, 446, 61, 0, Math.PI * 2);
                ctx.stroke();
            } else {
                ctx.fillStyle = 'rgba(255,255,255,0.16)';
                ctx.beginPath();
                ctx.arc(138, 446, 58, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.font = '900 42px Inter, Arial, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText((currentUser.name || 'LU').split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase(), 138, 461);
                ctx.textAlign = 'left';
            }

            ctx.fillStyle = '#f8fafc';
            ctx.font = '900 34px Inter, Arial, sans-serif';
            ctx.fillText('Scan to send or receive money', 224, 430);
            ctx.fillStyle = 'rgba(255,255,255,0.72)';
            ctx.font = '700 24px Inter, Arial, sans-serif';
            ctx.fillText(currentUser.email || currentUser.phone || 'Lendily profile', 224, 474);
            ctx.fillText('Profile QR carries ID, contact, and bank details.', 224, 514);

            try {
                const link = document.createElement('a');
                link.download = `${(currentUser.lendilyId || 'lendily').toLowerCase()}-qr-card.png`;
                link.href = canvas.toDataURL('image/png');
                document.body.appendChild(link);
                link.click();
                link.remove();
                showToast('QR card downloaded.', 'success');
            } catch (error) {
                console.warn('QR card download failed.', error);
                showToast('QR card download was blocked. Opening the QR image instead.', 'info');
                window.open(getUserQrUrl(currentUser), '_blank', 'noopener,noreferrer');
            }
        };
        const renderSummaryRow = (label, value, emphasis = false) => `
            <div class="summary-line ${emphasis ? 'is-emphasis' : ''}">
                <p>${label}</p>
                <strong>${value}</strong>
            </div>
        `;
        const maskSensitiveNumber = (value, visibleDigits = 4) => {
            const digits = digitsOnly(String(value || ''));
            if (!digits) return 'Not provided';
            const visible = digits.slice(-visibleDigits);
            return `${'•'.repeat(Math.max(digits.length - visible.length, 4))}${visible}`;
        };
        const maskPhoneDisplay = (value) => {
            const digits = digitsOnly(String(value || ''));
            if (!digits) return 'Not provided';
            return `${digits.slice(0, 4)}••••${digits.slice(-3)}`;
        };
        const maskEmailDisplay = (value) => {
            const email = String(value || '').trim();
            if (!email || !email.includes('@')) return email || 'Not provided';
            const [name, domain] = email.split('@');
            return `${name.slice(0, 2)}•••@${domain}`;
        };
        const renderPrivacyNotice = () => `
            <div class="receipt-privacy-note">
                <strong>Privacy protected receipt.</strong>
                BVN, NIN, bank, account, and location details are hidden by default because receipts are often shared as screenshots.
                Lendily only helps users document private funding agreements. Lendily is not a bank, lender, credit bureau, or debt collector.
            </div>
        `;
        const renderAgreementSummaryCard = (loan, options = {}) => {
            const totalRepayment = calculateTotalRepayment(loan);
            const isGift = loan.fundingType === 'gift';
            const chargeLabel = loan.fundingType === 'halal' ? 'Markup' : 'Funding Charge';
            const note = cleanText(loan.transactionDetails || '');
            const statusText = options.statusText || getStatusLabel(loan.status || 'pending');
            const chargeValue = calculateFundingCharge(loan);
            const totalLabel = isGift ? 'Gift Amount' : 'Total Repayment';
            const totalValue = isGift ? loan.amount : totalRepayment;
            const detailRows = [
                renderSummaryRow('Funding Type', getFundingLabel(loan)),
                renderSummaryRow(getPurposeFieldLabel(loan), getPurposeLabel(loan.loanPurpose)),
                isGift ? '' : renderSummaryRow(loan.fundingType === 'halal' ? 'Markup Rate' : 'Interest Rate', `${loan.interestRate || 0}%`),
                isGift ? '' : renderSummaryRow('Due Date', formatDate(loan.dueDate)),
                isGift ? '' : renderSummaryRow('Plan', (loan.repaymentPlan || 'end_of_term').replace(/_/g, ' '))
            ].filter(Boolean).join('');

            return `
                <div class="receipt-summary-card">
                    <div class="receipt-summary-head">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="receipt-logo-dot">L</div>
                            <div>
                                <p>Lendily Receipt</p>
                                <h3>${loan.id}</h3>
                            </div>
                        </div>
                        <div class="receipt-head-side">
                            <img src="${getAgreementQrUrl(loan)}" alt="QR code for ${loan.id}">
                            <span>${statusText}</span>
                        </div>
                    </div>
                    <div class="receipt-summary-body">
                        <div class="receipt-party-row">
                            <div>
                                <p>Lender</p>
                                <strong>${loan.lender || 'Not provided'}</strong>
                            </div>
                            <div>
                                <p>Borrower</p>
                                <strong>${loan.borrower || 'Not provided'}</strong>
                            </div>
                        </div>
                        <div class="receipt-amount-strip">
                            <div>
                                <p>Principal</p>
                                <strong>${formatCurrency(loan.amount)}</strong>
                            </div>
                            <div>
                                <p>${isGift ? 'Charge' : chargeLabel}</p>
                                <strong>${isGift ? 'No repayment' : formatCurrency(chargeValue)}</strong>
                            </div>
                            <div>
                                <p>${totalLabel}</p>
                                <strong>${formatCurrency(totalValue)}</strong>
                            </div>
                        </div>
                        <div class="receipt-detail-grid">${detailRows}</div>
                        ${note ? `<p class="receipt-note">${note}</p>` : ''}
                    </div>
                </div>
            `;
        };

        const renderReceiptInfoCard = (title, rows, tone = 'slate') => `
            <section class="receipt-info-card ${tone}">
                <h4>${title}</h4>
                <div>
                    ${rows.map(row => `
                        <article>
                            <span>${row.label}</span>
                            <strong>${row.value}</strong>
                        </article>
                    `).join('')}
                </div>
            </section>
        `;

        const renderReceiptDocument = (loan, options = {}) => {
            const isGift = loan.fundingType === 'gift';
            const statusText = options.statusText || getStatusLabel(loan.status || 'pending');
            const chargeLabel = loan.fundingType === 'halal' ? 'Markup' : 'Funding charge';
            const chargeValue = calculateFundingCharge(loan);
            const totalValue = isGift ? loan.amount : calculateTotalRepayment(loan);
            const note = cleanText(loan.transactionDetails || '');
            const primaryAmountLabel = isGift ? 'Gift recorded' : 'Total repayment';
            const lenderRows = loan.showLenderDetails === false
                ? [{ label: 'Funder', value: 'Private funder' }]
                : [
                    { label: 'Name', value: loan.lender || 'Not provided' },
                    { label: 'Phone', value: loan.lenderPhone ? maskPhoneDisplay(loan.lenderPhone) : 'Not provided' },
                    { label: 'Email', value: loan.lenderEmail ? maskEmailDisplay(loan.lenderEmail) : 'Not provided' }
                ];
            const reviewerRows = options.reviewerRows || [];

            return `
                <div class="lendily-receipt-doc">
                    <section class="lendily-receipt-hero">
                        <div>
                            <span class="receipt-brand-mark">L</span>
                            <p>Lendily protected receipt</p>
                            <h3>${loan.id}</h3>
                            <small>${statusText}</small>
                        </div>
                        <img src="${getAgreementQrUrl(loan)}" alt="QR code for ${loan.id}">
                    </section>
                    <section class="receipt-total-panel">
                        <span>${primaryAmountLabel}</span>
                        <strong>${formatCurrency(totalValue)}</strong>
                        <small>${getFundingLabel(loan)} • ${getPurposeLabel(loan.loanPurpose)}</small>
                    </section>
                    <section class="receipt-party-grid">
                        <article>
                            <span>Lender</span>
                            <strong>${loan.lender || 'Not provided'}</strong>
                        </article>
                        <article>
                            <span>Borrower</span>
                            <strong>${loan.borrower || 'Not provided'}</strong>
                        </article>
                    </section>
                    <section class="receipt-money-grid">
                        <article><span>Principal</span><strong>${formatCurrency(loan.amount)}</strong></article>
                        <article><span>${isGift ? 'Charge' : chargeLabel}</span><strong>${isGift ? 'No repayment' : formatCurrency(chargeValue)}</strong></article>
                        <article><span>Due date</span><strong>${isGift ? 'Not applicable' : formatDate(loan.dueDate)}</strong></article>
                        <article><span>Plan</span><strong>${isGift ? 'Gift' : (loan.repaymentPlan || 'end_of_term').replace(/_/g, ' ')}</strong></article>
                    </section>
                    ${renderReceiptInfoCard('Agreement Details', [
                        { label: 'Funding type', value: getFundingLabel(loan) },
                        { label: getPurposeFieldLabel(loan), value: getPurposeLabel(loan.loanPurpose) },
                        { label: loan.fundingType === 'halal' ? 'Markup rate' : 'Interest rate', value: isGift ? 'N/A' : `${loan.interestRate || 0}%` },
                        { label: 'Transaction date', value: formatDate(getTransactionDate(loan)) }
                    ])}
                    ${renderReceiptInfoCard('Funder Details', lenderRows, 'blue')}
                    ${reviewerRows.length ? renderReceiptInfoCard('Reviewer', reviewerRows, 'slate') : ''}
                    ${note ? `<section class="receipt-note-card"><span>Note</span><p>${note}</p></section>` : ''}
                    ${renderPrivacyNotice()}
                </div>
            `;
        };

        const renderReviewSummaryCard = (loan) => {
            const isGift = loan.fundingType === 'gift';
            const isHalal = loan.fundingType === 'halal';
            const chargeAmount = calculateFundingCharge(loan);
            const totalDisplay = isGift ? 'No repayment' : formatCurrency(calculateTotalRepayment(loan));
            const chargeLabel = isHalal ? 'Markup Profit' : 'Interest Profit';
            const rateLabel = isHalal ? 'Markup Rate' : 'Interest Rate';
            const rateDisplay = isGift ? 'N/A' : `${loan.interestRate || 0}%`;
            const periodValue = isGift ? 'Not applicable' : (loan.interestPeriod || 'period').replace(/_/g, ' ');
            const repaymentPlan = isGift ? 'No repayment expected' : (loan.repaymentPlan || 'end_of_term').replace(/_/g, ' ');

            return `
                <div class="offer-summary-card review-summary-card">
                    <div class="offer-summary-top">
                        <div>
                            <p>Agreement Review</p>
                            <h3>${formatCurrency(loan.amount)}</h3>
                            <small>${loan.lender || 'Lender'} to ${loan.borrower || 'Borrower'} • ${loan.id}</small>
                        </div>
                        <span class="offer-summary-badge">
                            <i data-lucide="${isGift ? 'gift' : isHalal ? 'landmark' : 'hand-coins'}" class="w-3.5 h-3.5"></i>
                            ${getFundingLabel(loan)}
                        </span>
                    </div>
                    <div class="offer-summary-money-grid">
                        <div class="is-primary">
                            <span>Total repayment</span>
                            <strong>${totalDisplay}</strong>
                        </div>
                        <div>
                            <span>Principal</span>
                            <strong>${formatCurrency(loan.amount)}</strong>
                        </div>
                        <div>
                            <span>${chargeLabel}</span>
                            <strong>${isGift ? 'No profit' : formatCurrency(chargeAmount)}</strong>
                        </div>
                    </div>
                    <div class="offer-summary-meta">
                        <div><span>${rateLabel}</span><strong>${rateDisplay}</strong></div>
                        <div><span>Period</span><strong>${periodValue}</strong></div>
                        <div><span>Purpose</span><strong>${getPurposeLabel(loan.loanPurpose)}</strong></div>
                        <div><span>Plan</span><strong>${repaymentPlan}</strong></div>
                        <div><span>Due date</span><strong>${formatDate(loan.dueDate)}</strong></div>
                        <div><span>Status</span><strong>${getStatusLabel(loan.status)}</strong></div>
                    </div>
                    ${cleanText(loan.transactionDetails || '') ? `<p class="review-summary-note">${cleanText(loan.transactionDetails)}</p>` : ''}
                    <div class="review-decision-slot"></div>
                </div>
            `;
        };
        const getStatusLabel = (status) => status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');
        const getStatusColor = (status) => {
            if (status === 'active') return 'bg-blue-100 text-blue-800';
            if (status === 'repaid') return 'bg-green-100 text-green-800';
            if (status === 'rejected') return 'bg-gray-100 text-gray-800';
            if (status.includes('pending')) return 'bg-yellow-100 text-yellow-800';
            return 'bg-red-100 text-red-800';
        };
        const lenderDirectory = {
            'LN-JANE': 'Jane Doe',
            'LN-JOHN': 'John Wick',
            'LN-ADA': 'Ada Lovelace',
            'LN-AISHA': 'Aisha B.'
        };
        const NIGERIA_STATES_LGAS_URL = 'https://gist.githubusercontent.com/devhammed/0bb9eeac9ff22c895100d072f489dc98/raw/a7b19911407a89947c452339fee59f9335dc8225/nigeria-state-and-lgas.json';
        const NIGERIAN_BANKS_URL = 'https://gist.githubusercontent.com/LordGhostX/7d4afef16c477f01596b16f5a1876654/raw/2d278fb4b91ca3edcfcd83f3ec382f12a38fc0b1/banks.json';
        let nigeriaStatesAndLgas = [];
        let nigerianBanks = [];
        const borrowerDirectory = {
            'BR-MIKE': {
                borrowerId: 'BR-MIKE',
                name: 'Mike Ross',
                email: 'mike.ross@example.com',
                phone: '08022223333',
                role: 'borrower',
                dateOfBirth: '1994-04-12',
                residentialAddress: '14 Allen Avenue, Ikeja, Lagos',
                state: 'Lagos',
                lga: 'Ikeja',
                nin: '123456789012',
                bvn: '223456789012',
                idNumber: 'A12345678',
                bankName: 'ACCESS BANK',
                accountNumber: '0123456789',
                accountName: 'Mike Ross',
                idUploaded: true,
                passportUploaded: true,
                pin: '1234'
            },
            'BR-THOMAS': {
                borrowerId: 'BR-THOMAS',
                name: 'Big Thomas',
                email: 'thomas@example.com',
                phone: '08033334444',
                role: 'borrower',
                dateOfBirth: '1991-09-20',
                residentialAddress: '22 Market Road, Surulere, Lagos',
                state: 'Lagos',
                lga: 'Surulere',
                nin: '334455667788',
                bvn: '887766554433',
                idNumber: 'DL-445566',
                bankName: 'ACCESS BANK',
                accountNumber: '0987654321',
                accountName: 'Big Thomas',
                idUploaded: true,
                passportUploaded: false,
                pin: '4321'
            }
        };
        const normalizeLendilyId = (value) => value.trim().toUpperCase();
        const normalizeBorrowerId = (value) => value.trim().toUpperCase();
        const resolveLenderNameFromId = (value) => {
            const normalizedId = normalizeLendilyId(value);
            if (!normalizedId) return 'Not selected';
            return lenderDirectory[normalizedId] || `Linked to ${normalizedId}`;
        };

        const cleanText = (value) => value.trim().replace(/\s+/g, ' ');
        const digitsOnly = (value) => value.replace(/\D/g, '');
        const isValidEmail = (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const isValidPhone = (value) => /^[0-9]{7,11}$/.test(value);
        const isValidIdNumber = (value) => /^[0-9]{11,12}$/.test(value);
        const getPhoneDisplayEmail = (phone) => `${phone}@lendily.phone`;
        const normalizeWhatsAppPhone = (phone) => {
            const cleaned = digitsOnly(String(phone || ''));
            if (!cleaned || cleaned.length < 7) return '';
            if (cleaned.startsWith('234')) return cleaned;
            if (cleaned.startsWith('0')) return `234${cleaned.slice(1)}`;
            return cleaned;
        };
        const toLocalPhoneInput = (phone) => {
            const cleaned = digitsOnly(String(phone || ''));
            if (cleaned.startsWith('234') && cleaned.length >= 13) return `0${cleaned.slice(3, 13)}`;
            return cleaned.slice(0, 11);
        };
        const isPresent = (value) => {
            if (typeof value === 'boolean') return value;
            return String(value || '').trim().length > 0;
        };
        const getUserRole = (user = currentUser) => user?.role || 'lender';
        const getProfileRequirements = (role = 'lender') => {
            const lenderFields = [
                { key: 'name', label: 'Full name', category: 'Contact Details' },
                { key: 'phone', label: 'Phone number', category: 'Contact Details' }
            ];
            const borrowerFields = [
                { key: 'name', label: 'Full name', category: 'Contact Details' },
                { key: 'phone', label: 'Phone number', category: 'Contact Details' },
                { key: 'dateOfBirth', label: 'Date of Birth', category: 'Contact Details' },
                { key: 'residentialAddress', label: 'Residential Address', category: 'Address' },
                { key: 'state', label: 'State', category: 'Address' },
                { key: 'lga', label: 'LGA', category: 'Address' },
                { key: 'bankName', label: 'Bank Name', category: 'Bank Details' },
                { key: 'accountNumber', label: 'Account Number', category: 'Bank Details' },
                { key: 'accountName', label: 'Account Name', category: 'Bank Details' },
                { key: 'nin', label: 'NIN', category: 'Documents' },
                { key: 'bvn', label: 'BVN', category: 'Documents' },
                { key: 'idNumber', label: 'ID Number', category: 'Documents' },
                { key: 'idUploaded', label: 'ID Uploaded', category: 'Documents' },
                { key: 'passportUploaded', label: 'Passport Photo Uploaded', category: 'Documents' }
            ];
            return role === 'borrower' ? borrowerFields : lenderFields;
        };
        const getProfileCompleteness = (user = currentUser, role = getUserRole(user)) => {
            const requirements = getProfileRequirements(role);
            const completed = requirements.filter(item => isPresent(user?.[item.key]));
            return {
                role,
                percent: requirements.length ? Math.round((completed.length / requirements.length) * 100) : 0,
                items: requirements.map(item => ({ ...item, complete: isPresent(user?.[item.key]) })),
                completedCount: completed.length,
                totalCount: requirements.length
            };
        };
        const isProfileComplete = (user = currentUser, role = getUserRole(user)) => getProfileCompleteness(user, role).percent === 100;

        const showFieldError = (input, message) => {
            input.focus();
            input.classList.add('border-red-500');
            input.setCustomValidity(message);
            input.reportValidity();
            showToast(message, 'error');
            setTimeout(() => input.setCustomValidity(''), 1000);
            return false;
        };

        const setText = (id, text) => {
            const element = document.getElementById(id);
            if (element) element.textContent = text;
        };

        const setHtml = (id, html) => {
            const element = document.getElementById(id);
            if (element) element.innerHTML = html;
        };

        const getStateRecord = (stateName) => nigeriaStatesAndLgas.find(item => item.state === stateName);

        const populateStateSelect = (stateSelect, selectedState = '') => {
            if (!stateSelect || !nigeriaStatesAndLgas.length) return;
            stateSelect.innerHTML = '<option value="">Select state</option>' + nigeriaStatesAndLgas
                .map(item => `<option value="${item.state}">${item.state}</option>`)
                .join('');
            stateSelect.value = selectedState || '';
        };

        const populateLgaSelect = (stateSelect, lgaSelect, selectedLga = '') => {
            if (!stateSelect || !lgaSelect) return;
            const stateRecord = getStateRecord(stateSelect.value);
            lgaSelect.disabled = !stateRecord;
            lgaSelect.innerHTML = '<option value="">Select LGA</option>' + (stateRecord?.lgas || [])
                .map(lga => `<option value="${lga}">${lga}</option>`)
                .join('');
            lgaSelect.value = selectedLga && (stateRecord?.lgas || []).includes(selectedLga) ? selectedLga : '';
        };

        const setStateLgaPair = (stateId, lgaId, stateValue = '', lgaValue = '') => {
            const stateSelect = document.getElementById(stateId);
            const lgaSelect = document.getElementById(lgaId);
            populateStateSelect(stateSelect, stateValue);
            populateLgaSelect(stateSelect, lgaSelect, lgaValue);
        };

        const setupStateLgaPair = (stateId, lgaId) => {
            const stateSelect = document.getElementById(stateId);
            const lgaSelect = document.getElementById(lgaId);
            if (!stateSelect || !lgaSelect) return;
            stateSelect.addEventListener('change', () => populateLgaSelect(stateSelect, lgaSelect));
        };

        const initializeStateLgaControls = () => {
            [
                ['profileState', 'profileLga', currentUser?.state, currentUser?.lga],
                ['acceptBorrowerState', 'acceptBorrowerLga']
            ].forEach(([stateId, lgaId, stateValue, lgaValue]) => {
                setupStateLgaPair(stateId, lgaId);
                setStateLgaPair(stateId, lgaId, stateValue, lgaValue);
            });
        };

        const loadNigeriaStatesAndLgas = async () => {
            try {
                const response = await fetch(NIGERIA_STATES_LGAS_URL);
                if (!response.ok) throw new Error('State/LGA list unavailable.');
                nigeriaStatesAndLgas = await response.json();
                initializeStateLgaControls();
                renderRequestProfileGate();
            } catch (error) {
                showToast('Could not load Nigerian states and LGAs. Check your connection.', 'error');
            }
        };

        const populateBankSelect = (select, selectedBank = '') => {
            if (!select || !nigerianBanks.length) return;
            select.innerHTML = '<option value="">Select bank</option>' + nigerianBanks
                .map(bank => `<option value="${bank.name}">${bank.name}</option>`)
                .join('');
            select.value = selectedBank || '';
        };

        const setBankSelect = (id, selectedBank = '') => populateBankSelect(document.getElementById(id), selectedBank);

        const initializeBankControls = () => {
            [
                ['profileBankName', currentUser?.bankName],
                ['borrowerBankName'],
                ['requestBankName', currentUser?.bankName],
                ['acceptBankName']
            ].forEach(([id, value]) => setBankSelect(id, value || ''));
        };

        const loadNigerianBanks = async () => {
            try {
                const response = await fetch(NIGERIAN_BANKS_URL);
                if (!response.ok) throw new Error('Bank list unavailable.');
                const data = await response.json();
                nigerianBanks = Object.keys(data).sort((a, b) => a.localeCompare(b)).map(name => ({ name, code: data[name] }));
                initializeBankControls();
                renderRequestProfileGate();
            } catch (error) {
                showToast('Could not load Nigerian banks. Check your connection.', 'error');
            }
        };

        const isSamePerson = ({ name = '', phone = '', email = '', borrowerId = '', lendilyId = '' } = {}, user = currentUser) => {
            if (!user) return false;
            const normalizedName = cleanText(name || '').toLowerCase();
            const normalizedPhone = digitsOnly(phone || '');
            const normalizedEmail = String(email || '').trim().toLowerCase();
            return Boolean(
                (normalizedName && normalizedName === cleanText(user.name || '').toLowerCase()) ||
                (normalizedPhone && normalizedPhone === digitsOnly(user.phone || '')) ||
                (normalizedEmail && normalizedEmail === String(user.email || '').trim().toLowerCase()) ||
                (borrowerId && normalizeBorrowerId(borrowerId) === normalizeBorrowerId(user.borrowerId || '')) ||
                (lendilyId && normalizeLendilyId(lendilyId) === normalizeLendilyId(user.lendilyId || ''))
            );
        };

        const requirePositiveNumber = (input, label) => {
            const value = parseCurrencyAmount(input.value);
            if (!Number.isFinite(value) || value <= 0) {
                return showFieldError(input, `${label} must be greater than zero.`);
            }
            return true;
        };

        const validatePhoneInput = (input, label = 'Phone number') => {
            input.value = digitsOnly(input.value);
            if (!isValidPhone(input.value)) {
                return showFieldError(input, `${label} must contain digits only, maximum 11 numbers.`);
            }
            return true;
        };

        const validateOptionalEmail = (input, label = 'Email address') => {
            input.value = input.value.trim();
            if (!isValidEmail(input.value)) {
                return showFieldError(input, `${label} is not valid.`);
            }
            return true;
        };

        const validateDueDate = (input) => {
            if (!input.value) return showFieldError(input, 'Repayment due date is required.');
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const [year, month, day] = input.value.split('-').map(Number);
            const dueDate = new Date(year, month - 1, day);
            if (dueDate < today) {
                return showFieldError(input, 'Repayment due date cannot be in the past.');
            }
            return true;
        };

        const getPendingParty = (loan) => loan.status === 'pending_lender_acceptance' ? 'lender' : 'borrower';
        const pendingStatuses = ['pending_borrower_acceptance', 'pending_lender_acceptance'];
        let liveAgreementFilter = 'all';
        let liveAgreementSort = 'recent';
        let statementSearchQuery = '';
        let statementFilter = 'all';
        let statementSort = 'recent';

        const chartPalette = ['#0f2f74', '#2563eb', '#60a5fa', '#64748b', '#f59e0b', '#ef4444', '#94a3b8'];

        const prepareCanvas = (canvas) => {
            if (!canvas) return null;
            const rect = canvas.getBoundingClientRect();
            const ratio = window.devicePixelRatio || 1;
            const width = Math.max(rect.width, 96);
            const height = Math.max(rect.height, 96);
            canvas.width = width * ratio;
            canvas.height = height * ratio;
            const ctx = canvas.getContext('2d');
            ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
            ctx.clearRect(0, 0, width, height);
            return { ctx, width, height };
        };

        const renderLegend = (legendId, items) => {
            const legend = document.getElementById(legendId);
            if (!legend) return;
            legend.innerHTML = items.map((item, index) => `
                <span><i class="legend-dot" style="background:${item.color || chartPalette[index % chartPalette.length]}"></i>${item.legendLabel || item.label}: ${item.value}</span>
            `).join('');
        };

        const renderEmptyChart = (canvasId, message = 'No chart data yet') => {
            const prepared = prepareCanvas(document.getElementById(canvasId));
            if (!prepared) return;
            const { ctx, width, height } = prepared;
            ctx.fillStyle = '#94a3b8';
            ctx.font = '700 14px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(message, width / 2, height / 2);
        };

        const renderDoughnutChart = (canvasId, legendId, items) => {
            const visibleItems = items.filter(item => item.value > 0);
            if (!visibleItems.length) {
                renderEmptyChart(canvasId);
                renderLegend(legendId, []);
                return;
            }

            const prepared = prepareCanvas(document.getElementById(canvasId));
            if (!prepared) return;
            const { ctx, width, height } = prepared;
            const total = visibleItems.reduce((sum, item) => sum + item.value, 0);
            const radius = Math.min(width, height) * 0.43;
            const innerRadius = radius * 0.58;
            const centerX = width / 2;
            const centerY = height / 2;
            let startAngle = -Math.PI / 2;

            visibleItems.forEach((item, index) => {
                const slice = (item.value / total) * Math.PI * 2;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, startAngle, startAngle + slice);
                ctx.closePath();
                ctx.fillStyle = item.color || chartPalette[index % chartPalette.length];
                ctx.fill();
                startAngle += slice;
            });

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = '#0f172a';
            ctx.font = '800 22px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(String(total), centerX, centerY - 2);
            ctx.fillStyle = '#64748b';
            ctx.font = '700 10px Inter, sans-serif';
            ctx.fillText('records', centerX, centerY + 16);

            renderLegend(legendId, visibleItems.map((item, index) => ({
                ...item,
                color: item.color || chartPalette[index % chartPalette.length]
            })));
        };

        const renderDashboardCharts = (myLoans) => {
            const fundingItems = ['loan', 'gift', 'halal'].map((type, index) => ({
                label: getFundingLabel({ fundingType: type }),
                value: myLoans.filter(loan => loan.fundingType === type).length,
                color: chartPalette[index]
            }));

            const compactStatusLabels = {
                active: 'Active',
                pending_borrower_acceptance: 'Borrower pending',
                pending_lender_acceptance: 'Lender pending',
                repaid: 'Repaid',
                defaulted: 'Defaulted'
            };
            const statusItems = ['active', 'pending_borrower_acceptance', 'pending_lender_acceptance', 'repaid', 'defaulted'].map((status, index) => ({
                label: getStatusLabel(status),
                legendLabel: compactStatusLabels[status],
                value: myLoans.filter(loan => loan.status === status).length,
                color: chartPalette[index]
            }));

            renderDoughnutChart('funding-mix-chart', 'funding-mix-legend', fundingItems);
            renderDoughnutChart('status-split-chart', 'status-split-legend', statusItems);
        };

        const renderTransactionHistory = (myLoans) => {
            const body = document.getElementById('transaction-history-body');
            if (!body) return;
            const formatStatementAmount = (value) => {
                const amount = Number(value) || 0;
                const sign = amount < 0 ? '-' : '';
                const abs = Math.abs(amount);
                const compact = (divisor, suffix) => {
                    const raw = abs / divisor;
                    const text = raw >= 10 || Number.isInteger(raw)
                        ? Math.round(raw).toLocaleString('en-NG')
                        : raw.toFixed(1).replace(/\.0$/, '');
                    return `${sign}₦${text}${suffix}`;
                };
                if (abs >= 1000000000) return compact(1000000000, 'b');
                if (abs >= 1000000) return compact(1000000, 'm');
                if (abs >= 1000) return compact(1000, 'k');
                return `${sign}₦${abs.toLocaleString('en-NG')}`;
            };
            const searchInput = document.getElementById('statement-search');
            const filterSelect = document.getElementById('statement-filter');
            const sortSelect = document.getElementById('statement-sort');
            if (searchInput && searchInput.value !== statementSearchQuery) searchInput.value = statementSearchQuery;
            if (filterSelect) filterSelect.value = statementFilter;
            if (sortSelect) sortSelect.value = statementSort;

            const statementLoans = myLoans.filter(loan => !pendingStatuses.includes(loan.status));

            if (!statementLoans.length) {
                setText('history-count', '0 records');
                body.innerHTML = '<tr><td colspan="5" class="text-slate-500">No past transactions yet.</td></tr>';
                return;
            }

            const normalizedSearch = statementSearchQuery.trim().toLowerCase();
            const getDateTime = (value, fallback) => {
                const parsed = Date.parse(value);
                return Number.isNaN(parsed) ? fallback : parsed;
            };
            const rows = statementLoans
                .map((loan, index) => ({ loan, index }))
                .filter(({ loan, index }) => {
                    const isLender = loan.lender.toLowerCase() === currentUser.name.toLowerCase();
                    const statementRole = isLender ? 'lending' : 'borrowing';
                    const statusIsPending = pendingStatuses.includes(loan.status);
                    if (statementFilter === 'lending' && statementRole !== 'lending') return false;
                    if (statementFilter === 'borrowing' && statementRole !== 'borrowing') return false;
                    if (statementFilter === 'pending' && !statusIsPending) return false;
                    if (['active', 'repaid', 'defaulted'].includes(statementFilter) && loan.status !== statementFilter) return false;
                    if (['loan', 'gift', 'halal'].includes(statementFilter) && loan.fundingType !== statementFilter) return false;
                    if (!normalizedSearch) return true;

                    const searchable = [
                        loan.id,
                        loan.lender,
                        loan.borrower,
                        getFundingLabel(loan),
                        getPurposeLabel(loan.loanPurpose),
                        getStatusLabel(loan.status),
                        statementRole,
                        formatCurrency(getDisplayTotal(loan)),
                        formatDate(getTransactionDate(loan, index)),
                        formatDate(getRepaymentDate(loan))
                    ].join(' ').toLowerCase();
                    return searchable.includes(normalizedSearch);
                })
                .sort((a, b) => {
                    const aTransactionTime = getDateTime(getTransactionDate(a.loan, a.index), a.index);
                    const bTransactionTime = getDateTime(getTransactionDate(b.loan, b.index), b.index);
                    if (statementSort === 'oldest') return aTransactionTime - bTransactionTime;
                    if (statementSort === 'amount_desc') return getDisplayTotal(b.loan) - getDisplayTotal(a.loan);
                    if (statementSort === 'amount_asc') return getDisplayTotal(a.loan) - getDisplayTotal(b.loan);
                    if (statementSort === 'profit_desc') return getTotalProfit(b.loan) - getTotalProfit(a.loan);
                    if (statementSort === 'due_soon') return getDateTime(getRepaymentDate(a.loan), 8640000000000000) - getDateTime(getRepaymentDate(b.loan), 8640000000000000);
                    return bTransactionTime - aTransactionTime;
                });

            const filteredLabel = rows.length === statementLoans.length ? `${rows.length}` : `${rows.length} of ${statementLoans.length}`;
            setText('history-count', `${filteredLabel} ${rows.length === 1 ? 'record' : 'records'}`);
            if (!rows.length) {
                body.innerHTML = '<tr><td colspan="5" class="text-slate-500">No past transactions match your search.</td></tr>';
                return;
            }

            body.innerHTML = rows.map(({ loan }, rowIndex) => {
                const isLender = loan.lender.toLowerCase() === currentUser.name.toLowerCase();
                const otherParty = isLender ? loan.borrower : loan.lender;
                return `
                    <tr>
                        <td data-label="S/N" class="statement-serial">${rowIndex + 1}</td>
                        <td data-label="Type">${getFundingLabel(loan)}</td>
                        <td data-label="Name"><span class="font-bold text-slate-800">${otherParty}</span><br><span class="text-xs text-slate-400">${loan.id}</span></td>
                        <td data-label="Amount" class="font-bold text-slate-900">${formatStatementAmount(getDisplayTotal(loan))}</td>
                        <td data-label="Receipt"><button type="button" class="view-receipt-btn quick-action-btn statement-receipt-btn text-xs font-bold px-3 py-2 text-slate-800" data-loan-id="${loan.id}">Receipt</button></td>
                    </tr>
                `;
            }).join('');
        };

        const buildRequestDraft = () => {
            const fundingType = document.getElementById('requestFundingType')?.value || 'loan';
            const lenderId = normalizeLendilyId(document.getElementById('requestLenderPaygoId')?.value || '');
            const amount = parseCurrencyAmount(document.getElementById('requestAmount')?.value || '0');
            return {
                borrower: currentUser?.name || 'You',
                lender: resolveLenderNameFromId(lenderId),
                borrowerState: currentUser?.state || 'Not selected',
                borrowerLga: currentUser?.lga || 'Not selected',
                amount: Number.isFinite(amount) ? amount : 0,
                dueDate: fundingType === 'gift' ? null : document.getElementById('requestRepaymentDate')?.value,
                interestRate: fundingType === 'gift' ? 0 : parseFloat(document.getElementById('requestInterestRate')?.value || '0'),
                interestPeriod: fundingType === 'halal' ? 'period' : document.getElementById('requestInterestPeriod')?.value,
                fundingType,
                loanPurpose: document.getElementById('requestLoanPurpose')?.value || 'personal',
                repaymentPlan: fundingType === 'gift' ? null : document.getElementById('requestRepaymentPlan')?.value
            };
        };

        const renderRequestSummary = () => {
            const summary = document.getElementById('requestTransactionSummary');
            if (!summary) return;

            const draft = buildRequestDraft();
            const isGift = draft.fundingType === 'gift';
            const isHalal = draft.fundingType === 'halal';
            const chargeLabel = isHalal ? 'Markup Rate' : 'Interest Rate';
            const chargeAmount = calculateFundingCharge(draft);
            const profitLabel = isHalal ? 'Markup Profit' : 'Interest Profit';
            const periodValue = isGift ? 'Not applicable' : (draft.interestPeriod || 'period').replace(/_/g, ' ');
            const totalValue = isGift ? 'No repayment' : formatCurrency(calculateTotalRepayment(draft));
            const durationValue = getAgreementDurationLabel(draft.dueDate);
            const repaymentPlan = isGift ? 'No repayment expected' : (draft.repaymentPlan || 'end_of_term').replace(/_/g, ' ');
            const dueDateValue = formatDate(draft.dueDate);
            const profitDisplay = isGift ? 'No profit' : formatCurrency(chargeAmount);
            const rateDisplay = isGift ? 'N/A' : `${Number.isFinite(draft.interestRate) ? draft.interestRate : 0}%`;

            summary.innerHTML = `
                <div class="offer-summary-card request-summary-card">
                    <div class="offer-summary-top">
                        <div>
                            <p>Request Summary</p>
                            <h3>${formatCurrency(draft.amount)}</h3>
                            <small>${draft.borrower} requesting from ${draft.lender}</small>
                        </div>
                        <span class="offer-summary-badge">
                            <i data-lucide="${isGift ? 'gift' : isHalal ? 'landmark' : 'hand-coins'}" class="w-3.5 h-3.5"></i>
                            ${getFundingLabel(draft)}
                        </span>
                    </div>
                    <div class="offer-summary-money-grid">
                        <div class="is-primary">
                            <span>Total to repay</span>
                            <strong>${totalValue}</strong>
                        </div>
                        <div>
                            <span>Requested amount</span>
                            <strong>${formatCurrency(draft.amount)}</strong>
                        </div>
                        <div>
                            <span>${profitLabel}</span>
                            <strong>${profitDisplay}</strong>
                        </div>
                    </div>
                    <div class="offer-summary-meta">
                        <div><span>${chargeLabel}</span><strong>${rateDisplay}</strong></div>
                        <div><span>Period</span><strong>${periodValue}</strong></div>
                        <div><span>Purpose</span><strong>${getPurposeLabel(draft.loanPurpose)}</strong></div>
                        <div><span>Plan</span><strong>${repaymentPlan}</strong></div>
                        <div><span>Duration</span><strong>${durationValue}</strong></div>
                        <div><span>Due date</span><strong>${dueDateValue}</strong></div>
                    </div>
                </div>
            `;
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        };

        const getAgreementDurationLabel = (dueDate) => {
            if (!dueDate) return 'Not applicable';
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const endDate = new Date(dueDate);
            if (Number.isNaN(endDate.getTime())) return 'Select a valid date';
            endDate.setHours(0, 0, 0, 0);
            const days = Math.max(Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)), 0);
            if (days === 0) return 'Due today';
            const months = days / 30.44;
            return `${days} ${days === 1 ? 'day' : 'days'}${days >= 30 ? ` (${months.toFixed(1)} months)` : ''}`;
        };

        const buildOfferDraft = () => {
            const fundingType = document.getElementById('fundingType')?.value || 'loan';
            const amount = parseCurrencyAmount(document.getElementById('loanAmount')?.value || '0');
            return {
                lender: currentUser?.name || 'You',
                borrower: cleanText(document.getElementById('borrowerName')?.value || '') || (fundingType === 'gift' ? 'Recipient' : 'Borrower'),
                amount: Number.isFinite(amount) ? amount : 0,
                dueDate: fundingType === 'gift' ? null : document.getElementById('repaymentDate')?.value,
                interestRate: fundingType === 'gift' ? 0 : parseFloat(document.getElementById('interestRate')?.value || '0'),
                interestPeriod: fundingType === 'halal' ? 'period' : document.getElementById('interestPeriod')?.value,
                fundingType,
                loanPurpose: document.getElementById('loanPurpose')?.value || 'personal',
                repaymentPlan: fundingType === 'gift' ? null : document.getElementById('repaymentPlan')?.value
            };
        };

        const renderOfferPreview = () => {
            const preview = document.getElementById('offerTransactionPreview');
            if (!preview) return;

            const draft = buildOfferDraft();
            const isGift = draft.fundingType === 'gift';
            const isHalal = draft.fundingType === 'halal';
            const chargeLabel = isHalal ? 'Markup Profit' : 'Interest Profit';
            const rateLabel = isHalal ? 'Markup Rate' : 'Interest Rate';
            const chargeAmount = calculateFundingCharge(draft);
            const totalRepayment = isGift ? draft.amount : calculateTotalRepayment(draft);
            const periodValue = isGift ? 'Not applicable' : (draft.interestPeriod || 'period').replace(/_/g, ' ');
            const durationValue = getAgreementDurationLabel(draft.dueDate);
            const repaymentPlan = isGift ? 'No repayment expected' : (draft.repaymentPlan || 'end_of_term').replace(/_/g, ' ');
            const totalDisplay = isGift ? 'No repayment' : formatCurrency(totalRepayment);
            const profitDisplay = isGift ? 'No profit' : formatCurrency(chargeAmount);
            const rateDisplay = isGift ? 'N/A' : `${Number.isFinite(draft.interestRate) ? draft.interestRate : 0}%`;
            const dueDateDisplay = formatDate(draft.dueDate);
            const borrowerDisplay = draft.borrower || 'Borrower name';

            preview.innerHTML = `
                <div class="offer-summary-card">
                    <div class="offer-summary-top">
                        <div>
                            <p>Loan Summary</p>
                            <h3>${formatCurrency(draft.amount)}</h3>
                            <small>${draft.lender} to ${borrowerDisplay}</small>
                        </div>
                        <span class="offer-summary-badge">
                            <i data-lucide="${isGift ? 'gift' : isHalal ? 'landmark' : 'hand-coins'}" class="w-3.5 h-3.5"></i>
                            ${getFundingLabel(draft)}
                        </span>
                    </div>
                    <div class="offer-summary-money-grid">
                        <div class="is-primary">
                            <span>Total to receive</span>
                            <strong>${totalDisplay}</strong>
                        </div>
                        <div>
                            <span>Principal</span>
                            <strong>${formatCurrency(draft.amount)}</strong>
                        </div>
                        <div>
                            <span>${chargeLabel}</span>
                            <strong>${profitDisplay}</strong>
                        </div>
                    </div>
                    <div class="offer-summary-meta">
                        <div><span>${rateLabel}</span><strong>${rateDisplay}</strong></div>
                        <div><span>Period</span><strong>${periodValue}</strong></div>
                        <div><span>Purpose</span><strong>${getPurposeLabel(draft.loanPurpose)}</strong></div>
                        <div><span>Plan</span><strong>${repaymentPlan}</strong></div>
                        <div><span>Duration</span><strong>${durationValue}</strong></div>
                        <div><span>Due date</span><strong>${dueDateDisplay}</strong></div>
                    </div>
                </div>
            `;
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        };

        const formatPercentInputValue = (value) => {
            const numericValue = Number(value);
            if (!Number.isFinite(numericValue)) return '0';
            return numericValue.toFixed(2).replace(/\.?0+$/, '');
        };

        const setupProfitRateSync = ({ amountId, rateId, profitId, periodId, dueDateId, fundingTypeId, buildDraft, afterUpdate }) => {
            const amountInput = document.getElementById(amountId);
            const rateInput = document.getElementById(rateId);
            const profitInput = document.getElementById(profitId);
            const periodInput = document.getElementById(periodId);
            const dueDateInput = document.getElementById(dueDateId);
            const fundingTypeInput = document.getElementById(fundingTypeId);
            if (!amountInput || !rateInput || !profitInput || !fundingTypeInput) return;

            let syncing = false;
            let activeSource = 'rate';

            const syncProfitFromRate = () => {
                if (syncing) return;
                syncing = true;
                const draft = buildDraft();
                const profit = calculateFundingCharge(draft);
                profitInput.value = draft.fundingType === 'gift' ? '0' : formatAmountValue(profit.toFixed(2));
                syncing = false;
                afterUpdate?.();
            };

            const syncRateFromProfit = () => {
                if (syncing) return;
                syncing = true;
                const draft = buildDraft();
                const expectedProfit = parseCurrencyAmount(profitInput.value || '0');
                const rate = calculateRateFromExpectedProfit(draft, Number.isFinite(expectedProfit) ? expectedProfit : 0);
                rateInput.value = draft.fundingType === 'gift' ? '0' : formatPercentInputValue(rate);
                syncing = false;
                afterUpdate?.();
            };

            rateInput.addEventListener('input', () => {
                activeSource = 'rate';
                syncProfitFromRate();
            });
            profitInput.addEventListener('input', () => {
                activeSource = 'profit';
                const formatted = formatAmountValue(profitInput.value);
                if (profitInput.value !== formatted) profitInput.value = formatted;
                syncRateFromProfit();
            });
            [amountInput, periodInput, dueDateInput, fundingTypeInput].forEach(input => {
                const syncFromActiveSource = () => {
                    if (activeSource === 'profit') {
                        syncRateFromProfit();
                    } else {
                        syncProfitFromRate();
                    }
                };
                input?.addEventListener('input', syncFromActiveSource);
                input?.addEventListener('change', syncFromActiveSource);
            });
            syncProfitFromRate();
        };

        // --- AUTHENTICATION & UI UPDATES ---
        const loginModal = document.getElementById('login-modal');
        const registerModal = document.getElementById('register-modal');
        const receiptModal = document.getElementById('receipt-modal');
        const requestLegalModal = document.getElementById('request-legal-modal');
        const qrScanModal = document.getElementById('qr-scan-modal');
        const liveActionModal = document.getElementById('live-action-modal');
        let activeLiveActionConfirm = null;
        let activeLegalConsentTarget = 'request';
        let lenderLegalAccepted = false;
        let requestLegalAccepted = false;
        let activeQrScanTarget = 'borrower';
        let qrScanStream = null;
        let qrScanTimer = null;
        const legalSectionIds = {
            terms: 'legal-terms-section',
            privacy: 'legal-privacy-section',
            waiver: 'legal-waiver-section'
        };
        const legalTitles = {
            terms: 'Terms of Service',
            privacy: 'Privacy Policy',
            waiver: 'Waiver Policy'
        };

        const openLegalConsentModal = (target = 'request', section = 'terms') => {
            const selectedSection = legalSectionIds[section] ? section : 'terms';
            const isFooterPreview = target === 'footer';
            activeLegalConsentTarget = target;
            setText(
                'request-legal-eyebrow',
                isFooterPreview ? 'Lendily Legal' : target === 'lender' ? 'Lender Consent' : 'Borrow Request Consent'
            );
            setText('request-legal-title', legalTitles[selectedSection]);
            document.getElementById('requestLegalAgreeBtn')?.classList.toggle('hidden', isFooterPreview);
            requestLegalModal?.classList.add('active');
            if (typeof lucide !== 'undefined') lucide.createIcons();
            window.setTimeout(() => {
                document.getElementById(legalSectionIds[selectedSection])
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 80);
        };

        const resetLegalConsentState = (target) => {
            const isLender = target === 'lender';
            const checkbox = document.getElementById(isLender ? 'lenderLegalConsent' : 'requestLegalConsent');
            const status = document.getElementById(isLender ? 'lenderLegalConsentStatus' : 'requestLegalConsentStatus');
            if (isLender) lenderLegalAccepted = false;
            else requestLegalAccepted = false;
            if (checkbox && checkbox.checked) {
                checkbox.checked = false;
                checkbox.dispatchEvent(new Event('change', { bubbles: true }));
            }
            if (status) {
                status.textContent = isLender
                    ? 'You must review and agree before creating an offer.'
                    : 'You must review and agree before sending a borrow request.';
                status.className = 'text-xs text-slate-500 mt-2';
            }
        };

        const markLegalConsentAccepted = (target = activeLegalConsentTarget) => {
            const isLender = target === 'lender';
            const checkbox = document.getElementById(isLender ? 'lenderLegalConsent' : 'requestLegalConsent');
            const status = document.getElementById(isLender ? 'lenderLegalConsentStatus' : 'requestLegalConsentStatus');
            if (isLender) lenderLegalAccepted = true;
            else requestLegalAccepted = true;
            if (checkbox) {
                checkbox.checked = true;
                checkbox.dispatchEvent(new Event('change', { bubbles: true }));
            }
            if (status) {
                status.textContent = isLender
                    ? 'Terms and Conditions accepted for this offer.'
                    : 'Terms and Privacy Statement accepted for this request.';
                status.className = 'text-xs text-emerald-600 font-bold mt-2';
            }
            requestLegalModal?.classList.remove('active');
        };

        const stopQrScanner = () => {
            window.clearInterval(qrScanTimer);
            qrScanTimer = null;
            qrScanStream?.getTracks().forEach(track => track.stop());
            qrScanStream = null;
            const video = document.getElementById('qrScanVideo');
            if (video) video.srcObject = null;
        };

        const applyScannedLendilyUser = (profile) => {
            if (!profile) return showToast('That QR code is not a valid Lendily profile.', 'error');

            if (activeQrScanTarget === 'lender') {
                const lenderId = normalizeLendilyId(profile.lendilyId || '');
                const lenderInput = document.getElementById('requestLenderPaygoId');
                if (!lenderId) return showToast('This QR does not include a lender ID.', 'error');
                if (isSamePerson({ lendilyId: lenderId, phone: profile.phone, email: profile.email })) {
                    return showToast('You cannot request funds from yourself.', 'error');
                }
                if (lenderInput) lenderInput.value = lenderId;
                if (profile.name) lenderDirectory[lenderId] = profile.name;
                renderRequestSummary();
                qrScanModal?.classList.remove('active');
                stopQrScanner();
                showToast(`${profile.name || lenderId} loaded as lender.`, 'success');
                return true;
            }

            const isGiftFlow = document.getElementById('fundingType')?.value === 'gift';
            const partyLabel = isGiftFlow ? 'Receiver' : 'Borrower';
            if (isSamePerson({
                name: profile.name,
                phone: profile.phone,
                email: profile.email,
                borrowerId: profile.borrowerId
            })) {
                return showToast(`${partyLabel} cannot be the same person as you.`, 'error');
            }
            const borrowerId = normalizeBorrowerId(profile.borrowerId || '');
            if (borrowerId) document.getElementById('borrowerLookupId') && (document.getElementById('borrowerLookupId').value = borrowerId);
            document.getElementById('borrowerName') && (document.getElementById('borrowerName').value = profile.name || '');
            document.getElementById('borrowerPhone') && (document.getElementById('borrowerPhone').value = toLocalPhoneInput(profile.phone || ''));
            document.getElementById('borrowerEmail') && (document.getElementById('borrowerEmail').value = profile.email || '');
            setBankSelect('borrowerBankName', profile.bankName || '');
            document.getElementById('borrowerAccountNumber') && (document.getElementById('borrowerAccountNumber').value = digitsOnly(profile.accountNumber || '').slice(0, 10));
            document.getElementById('borrowerAccountName') && (document.getElementById('borrowerAccountName').value = profile.accountName || profile.name || '');
            if (borrowerId) {
                borrowerDirectory[borrowerId] = {
                    ...(borrowerDirectory[borrowerId] || {}),
                    ...profile,
                    borrowerId,
                    role: 'borrower'
                };
            }
            const hint = document.getElementById('borrowerLookupHint');
            if (hint) hint.textContent = `${profile.name || partyLabel} loaded from scanned Lendily QR.`;
            renderOfferPreview();
            qrScanModal?.classList.remove('active');
            stopQrScanner();
            showToast(`${partyLabel} details loaded from QR.`, 'success');
            return true;
        };

        const processQrScanText = (value) => applyScannedLendilyUser(decodeLendilyQrText(value));

        const closeLiveActionModal = () => {
            liveActionModal?.classList.remove('active');
            activeLiveActionConfirm = null;
            const consent = document.getElementById('live-action-consent');
            const confirm = document.getElementById('live-action-confirm');
            if (consent) consent.checked = false;
            if (confirm) confirm.disabled = true;
        };

        const openLiveActionModal = ({
            tone = 'warning',
            eyebrow = 'Agreement action',
            title = 'Review action',
            icon = 'shield-alert',
            body = '',
            consentCopy = 'I understand and want to continue.',
            confirmLabel = 'Continue',
            onConfirm
        } = {}) => {
            if (!liveActionModal) return;
            const iconNode = document.getElementById('live-action-icon');
            const confirm = document.getElementById('live-action-confirm');
            const consent = document.getElementById('live-action-consent');
            setText('live-action-eyebrow', eyebrow);
            setText('live-action-title', title);
            setText('live-action-consent-copy', consentCopy);
            const bodyNode = document.getElementById('live-action-body');
            if (bodyNode) bodyNode.innerHTML = body;
            if (iconNode) {
                iconNode.className = `live-action-icon ${tone}`;
                iconNode.innerHTML = `<i data-lucide="${icon}" class="w-5 h-5"></i>`;
            }
            if (confirm) {
                confirm.textContent = confirmLabel;
                confirm.disabled = true;
                confirm.classList.toggle('is-danger-action', tone === 'danger');
            }
            if (consent) consent.checked = false;
            activeLiveActionConfirm = onConfirm;
            liveActionModal.classList.add('active');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        };

        const openQrScanner = async (target) => {
            activeQrScanTarget = target;
            setText('qr-scan-title', target === 'lender' ? 'Scan Lender QR' : 'Scan Borrower or Receiver QR');
            setText('qrScanHint', 'Allow camera access and place the Lendily QR inside the portrait frame.');
            const manual = document.getElementById('qrManualPayload');
            if (manual) manual.value = '';
            qrScanModal?.classList.add('active');
            if (typeof lucide !== 'undefined') lucide.createIcons();

            const video = document.getElementById('qrScanVideo');
            if (!video || !navigator.mediaDevices?.getUserMedia) {
                setText('qrScanHint', 'Camera scanning is unavailable in this browser. Paste QR details below.');
                return;
            }
            if (!('BarcodeDetector' in window)) {
                setText('qrScanHint', 'QR camera scanning is not supported in this browser. Paste QR details below.');
                return;
            }

            try {
                stopQrScanner();
                qrScanStream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment', width: { ideal: 720 }, height: { ideal: 960 } },
                    audio: false
                });
                video.srcObject = qrScanStream;
                await video.play();
                const detector = new window.BarcodeDetector({ formats: ['qr_code'] });
                qrScanTimer = window.setInterval(async () => {
                    try {
                        const codes = await detector.detect(video);
                        const rawValue = codes?.[0]?.rawValue;
                        if (rawValue) processQrScanText(rawValue);
                    } catch (error) {
                        console.warn('QR scan frame failed.', error);
                    }
                }, 450);
            } catch (error) {
                setText('qrScanHint', 'Camera permission is required to scan. Paste QR details below if needed.');
                showToast('Camera permission is required to scan QR codes.', 'error');
            }
        };
        
        const updateAuthUI = () => {
            const authLinksContainer = document.getElementById('auth-links');
            const mobileAuthLinksContainer = document.getElementById('mobile-auth-links');
            
            let linksHtml = '';
            let mobileLinksHtml = '';
            if (loggedIn) {
                linksHtml = `
                    <a href="#dashboard" class="nav-link gradient-btn text-white font-semibold py-2 px-6 rounded-full shadow-lg">My Dashboard</a>
                    <button class="logout-btn hidden md:block text-slate-600 hover:text-blue-500">${t('auth.logout')}</button>
                `;
                mobileLinksHtml = `
                    <a href="#dashboard" class="nav-link gradient-btn text-white font-semibold py-2 px-6 rounded-full shadow-lg inline-flex mt-3">My Dashboard</a>
                    <button class="logout-btn block w-full text-left py-3 text-slate-600 hover:text-blue-500">${t('auth.logout')}</button>
                `;
            } else {
                linksHtml = `
                    <a href="#login" class="login-btn nav-link text-slate-600 hover:text-blue-500 font-semibold">${t('auth.login')}</a>
                    <a href="#signup" class="register-btn nav-link gradient-btn text-white font-semibold py-2 px-6 rounded-full">Sign Up</a>
                `;
                mobileLinksHtml = `
                    <a href="#login" class="login-btn nav-link block w-full text-left py-3 text-slate-600 hover:text-blue-500 font-semibold">${t('auth.login')}</a>
                    <a href="#signup" class="register-btn nav-link gradient-btn text-white font-semibold py-2 px-6 rounded-full mt-2">Sign Up</a>
                `;
            }
            authLinksContainer.innerHTML = linksHtml;
            mobileAuthLinksContainer.innerHTML = mobileLinksHtml;

            // Add event listeners to newly created buttons
            if (loggedIn) {
                document.querySelectorAll('.logout-btn').forEach(button => button.addEventListener('click', handleLogout));
                document.getElementById('logout-btn-sidebar')?.addEventListener('click', handleLogout);
                document.getElementById('logout-btn-profile')?.addEventListener('click', handleLogout);
            }
        };

        const handleLogout = () => {
            loggedIn = false;
            currentUser = null;
            updateAuthUI();
            history.pushState({pageId: 'login'}, null, '#login');
            showPage('login');
            showToast('You have been logged out.', 'info');
        };

        const continueAsDemoUser = () => {
            loggedIn = true;
            currentUser = { ...demoUser };
            ensureCurrentUserQrIdentity();
            updateAuthUI();
        };

        // --- MODAL HANDLING ---
        const setupModals = () => {
            [loginModal, registerModal, receiptModal, requestLegalModal, qrScanModal, liveActionModal].forEach(modal => {
                modal?.addEventListener('click', (e) => {
                    if (e.target !== modal) return;
                    if (modal === liveActionModal) closeLiveActionModal();
                    else modal.classList.remove('active');
                    if (modal === qrScanModal) stopQrScanner();
                });
            });
            document.getElementById('request-legal-close')?.addEventListener('click', () => requestLegalModal?.classList.remove('active'));
            document.getElementById('requestLegalAgreeBtn')?.addEventListener('click', () => markLegalConsentAccepted());
            document.querySelectorAll('[data-legal-footer-open]').forEach(button => {
                button.addEventListener('click', () => openLegalConsentModal('footer', button.dataset.legalFooterOpen || 'terms'));
            });
            document.getElementById('qr-scan-close')?.addEventListener('click', () => {
                qrScanModal?.classList.remove('active');
                stopQrScanner();
            });
            document.getElementById('qrManualApplyBtn')?.addEventListener('click', () => {
                processQrScanText(document.getElementById('qrManualPayload')?.value || '');
            });
            document.getElementById('live-action-close')?.addEventListener('click', closeLiveActionModal);
            document.getElementById('live-action-cancel')?.addEventListener('click', closeLiveActionModal);
            document.getElementById('live-action-consent')?.addEventListener('change', (event) => {
                const confirm = document.getElementById('live-action-confirm');
                if (confirm) confirm.disabled = !event.target.checked;
            });
            document.getElementById('live-action-confirm')?.addEventListener('click', async () => {
                const handler = activeLiveActionConfirm;
                closeLiveActionModal();
                if (typeof handler === 'function') await handler();
            });
            document.getElementById('copyProfileQrPayload')?.addEventListener('click', async () => {
                ensureCurrentUserQrIdentity();
                const value = getUserQrText(currentUser);
                try {
                    await navigator.clipboard?.writeText(value);
                    showToast('QR details copied.', 'success');
                } catch (error) {
                    showToast(value, 'info');
                }
            });
            document.getElementById('downloadProfileQrCard')?.addEventListener('click', downloadCurrentUserQrCard);
            
            document.getElementById('show-register-modal').addEventListener('click', (e) => {
                e.preventDefault();
                loginModal.classList.remove('active');
                registerModal.classList.add('active');
            });
            document.getElementById('show-login-modal').addEventListener('click', (e) => {
                e.preventDefault();
                registerModal.classList.remove('active');
                loginModal.classList.add('active');
            });

            const submitLogin = (e, phoneId, emailId, modalToClose) => {
                e.preventDefault();
                const loginPhone = document.getElementById(phoneId);
                const loginEmail = document.getElementById(emailId);
                if (!validatePhoneInput(loginPhone, 'Phone number')) return;
                if (!validateOptionalEmail(loginEmail, 'Email address')) return;
                loggedIn = true;
                // Simulate logging in as a user who can accept a loan
                const emailValue = loginEmail.value || getPhoneDisplayEmail(loginPhone.value);
                if (loginPhone.value.endsWith('5678') || emailValue.toLowerCase().includes('mike')) {
                    currentUser = { ...borrowerDirectory['BR-MIKE'], email: emailValue, phone: loginPhone.value || borrowerDirectory['BR-MIKE'].phone };
                } else {
                    currentUser = { ...demoUser, email: emailValue, phone: loginPhone.value };
                }
                ensureCurrentUserQrIdentity();
                updateAuthUI();
                modalToClose?.classList.remove('active');
                showToast('Login successful!', 'success');
                history.pushState({pageId: 'dashboard'}, null, '#dashboard');
                showPage('dashboard');
            };

            const submitRegistration = (e, nameId, phoneId, emailId, modalToClose) => {
                e.preventDefault();
                const registerName = document.getElementById(nameId);
                const registerPhone = document.getElementById(phoneId);
                const registerEmail = document.getElementById(emailId);
                registerName.value = cleanText(registerName.value);
                if (!registerName.value) return showFieldError(registerName, 'Full name is required.');
                if (!validatePhoneInput(registerPhone, 'Phone number')) return;
                if (!validateOptionalEmail(registerEmail, 'Email address')) return;
                loggedIn = true;
                currentUser = {
                    name: registerName.value,
                    email: registerEmail.value || getPhoneDisplayEmail(registerPhone.value),
                    phone: registerPhone.value,
                    role: 'lender',
                    lendilyId: `LN-${registerName.value.split(/\s+/)[0].toUpperCase()}`,
                    borrowerId: `BR-${registerName.value.split(/\s+/)[0].toUpperCase()}`
                };
                ensureCurrentUserQrIdentity();
                lenderDirectory[currentUser.lendilyId] = currentUser.name;
                borrowerDirectory[currentUser.borrowerId] = {
                    borrowerId: currentUser.borrowerId,
                    name: currentUser.name,
                    email: currentUser.email,
                    phone: currentUser.phone,
                    role: 'borrower'
                };
                updateAuthUI();
                modalToClose?.classList.remove('active');
                showToast('Registration successful. Your Lendily QR is ready in your profile.', 'success');
                history.pushState({pageId: 'profile'}, null, '#profile');
                showPage('profile');
            };

            document.getElementById('login-form')?.addEventListener('submit', (e) => submitLogin(e, 'login-phone', 'login-email', loginModal));
            document.getElementById('login-page-form')?.addEventListener('submit', (e) => submitLogin(e, 'login-page-phone', 'login-page-email'));
            document.getElementById('register-form')?.addEventListener('submit', (e) => submitRegistration(e, 'register-name', 'register-phone', 'register-email', registerModal));
            document.getElementById('signup-page-form')?.addEventListener('submit', (e) => submitRegistration(e, 'signup-page-name', 'signup-page-phone', 'signup-page-email'));
        };

        const applyProfileCompletenessUi = (profileSource) => {
            if (!profileSource) return;
            const lenderCompleteness = getProfileCompleteness(profileSource, 'lender');
            const borrowerCompleteness = getProfileCompleteness(profileSource, 'borrower');

            setText('lender-completeness-percent', `${lenderCompleteness.percent}%`);
            setText('borrower-completeness-percent', `${borrowerCompleteness.percent}%`);
            setText('profile-completeness-percent', `${borrowerCompleteness.percent}%`);
            setText('profile-lender-percent', `${lenderCompleteness.percent}%`);
            setText('profile-borrower-percent', `${borrowerCompleteness.percent}%`);
            setText('profile-completeness-copy', 'Complete the categories below to unlock full lender and borrower access.');
            setText('lender-completeness-copy', currentLanguage === 'en'
                ? `${lenderCompleteness.completedCount} of ${lenderCompleteness.totalCount} lender fields are complete.`
                : `${lenderCompleteness.completedCount} / ${lenderCompleteness.totalCount} ${translatePhrase('Lender Profile')}.`);
            setText('borrower-completeness-copy', currentLanguage === 'en'
                ? `${borrowerCompleteness.completedCount} of ${borrowerCompleteness.totalCount} borrower fields are complete.`
                : `${borrowerCompleteness.completedCount} / ${borrowerCompleteness.totalCount} ${translatePhrase('Borrower Profile')}.`);
            setText('profile-lender-copy', `${lenderCompleteness.completedCount}/${lenderCompleteness.totalCount} complete`);
            setText('profile-borrower-copy', `${borrowerCompleteness.completedCount}/${borrowerCompleteness.totalCount} complete`);

            const lenderBar = document.getElementById('lender-completeness-bar');
            const borrowerBar = document.getElementById('borrower-completeness-bar');
            const profileBar = document.getElementById('profile-completeness-bar');
            const profileLenderBar = document.getElementById('profile-lender-bar');
            const profileBorrowerBar = document.getElementById('profile-borrower-bar');
            if (lenderBar) lenderBar.style.width = `${lenderCompleteness.percent}%`;
            if (borrowerBar) borrowerBar.style.width = `${borrowerCompleteness.percent}%`;
            if (profileBar) profileBar.style.width = `${borrowerCompleteness.percent}%`;
            if (profileLenderBar) profileLenderBar.style.width = `${lenderCompleteness.percent}%`;
            if (profileBorrowerBar) profileBorrowerBar.style.width = `${borrowerCompleteness.percent}%`;

            const borrowerGroups = borrowerCompleteness.items.reduce((acc, item) => {
                const category = item.category || 'Profile Details';
                acc[category] = acc[category] || [];
                acc[category].push(item);
                return acc;
            }, {});
            const setProfileCategoryProgress = (id, category, fallback) => {
                const items = borrowerGroups[category] || [];
                if (!items.length) return setText(id, fallback);
                const completed = items.filter(item => item.complete).length;
                const percent = Math.round((completed / items.length) * 100);
                setText(id, `${completed}/${items.length} complete • ${percent}%`);
            };
            setProfileCategoryProgress('profile-contact-progress', 'Contact Details', 'Name, phone, and birthday');
            setProfileCategoryProgress('profile-address-progress', 'Address', 'Residential address and location');
            setProfileCategoryProgress('profile-bank-progress', 'Bank Details', 'Receiving account information');
            setProfileCategoryProgress('profile-documents-progress', 'Documents', 'NIN, BVN, ID and passport photo');
        };

        const getProfileFormDraft = () => {
            const field = id => document.getElementById(id);
            const idUpload = field('profileIdUpload');
            const passportUpload = field('profilePassportUpload');
            return {
                ...(currentUser || {}),
                name: field('profileFullName') ? cleanText(field('profileFullName').value) : currentUser?.name,
                phone: field('profilePhone') ? field('profilePhone').value : currentUser?.phone,
                dateOfBirth: field('profileDob') ? field('profileDob').value : currentUser?.dateOfBirth,
                residentialAddress: field('profileAddress') ? cleanText(field('profileAddress').value) : currentUser?.residentialAddress,
                state: field('profileState') ? field('profileState').value : currentUser?.state,
                lga: field('profileLga') ? field('profileLga').value : currentUser?.lga,
                nin: field('profileNIN') ? digitsOnly(field('profileNIN').value) : currentUser?.nin,
                bvn: field('profileBVN') ? digitsOnly(field('profileBVN').value) : currentUser?.bvn,
                idNumber: field('profileIdNumber') ? cleanText(field('profileIdNumber').value) : currentUser?.idNumber,
                bankName: field('profileBankName') ? field('profileBankName').value : currentUser?.bankName,
                accountNumber: field('profileAccountNumber') ? digitsOnly(field('profileAccountNumber').value) : currentUser?.accountNumber,
                accountName: field('profileAccountName') ? cleanText(field('profileAccountName').value) : currentUser?.accountName,
                idUploaded: Boolean(currentUser?.idUploaded || idUpload?.files?.[0]),
                passportUploaded: Boolean(currentUser?.passportUploaded || passportUpload?.files?.[0])
            };
        };

        const updateProfileCompletenessFromForm = () => {
            if (!document.getElementById('profile-details-form')) return;
            applyProfileCompletenessUi(getProfileFormDraft());
        };

        const renderProfile = () => {
            if (!currentUser) return;
            ensureCurrentUserQrIdentity();
            const lenderCompleteness = getProfileCompleteness(currentUser, 'lender');
            const borrowerCompleteness = getProfileCompleteness(currentUser, 'borrower');
            const profileId = currentUser.borrowerId || currentUser.lendilyId || 'Not assigned';

            setText('profile-user-name', currentUser.name || 'Not provided');
            setText('profile-user-id', profileId);
            setText('profile-user-email', currentUser.email || 'Not provided');
            setText('profile-user-phone', currentUser.phone || 'Not provided');
            const avatar = document.getElementById('profile-user-avatar');
            if (avatar && currentUser.passportPhotoDataUrl) avatar.src = currentUser.passportPhotoDataUrl;
            const profileQr = document.getElementById('profile-user-qr');
            if (profileQr) {
                getUserQrDataUrl(currentUser, 260)
                    .then(src => { profileQr.src = src; })
                    .catch(() => { profileQr.src = getUserQrUrl(currentUser); });
            }

            applyProfileCompletenessUi(currentUser);

            const renderChecklist = (listId, completeness) => {
                const list = document.getElementById(listId);
                if (!list) return;
                const grouped = completeness.items.reduce((acc, item) => {
                    const category = item.category || 'Profile Details';
                    acc[category] = acc[category] || [];
                    acc[category].push(item);
                    return acc;
                }, {});
                list.innerHTML = Object.entries(grouped).map(([category, items], index) => {
                    const completed = items.filter(item => item.complete).length;
                    const percent = Math.round((completed / items.length) * 100);
                    return `
                        <details class="profile-completion-category" ${index === 0 ? 'open' : ''}>
                            <summary>
                                <span>
                                    <strong>${translatePhrase(category)}</strong>
                                    <small>${completed}/${items.length} complete</small>
                                </span>
                                <em class="${completed === items.length ? 'is-done' : 'is-missing'}">${percent}%</em>
                            </summary>
                            <div class="profile-category-progress">
                                <span style="width:${percent}%"></span>
                            </div>
                            <div class="profile-category-list">
                                ${items.map(item => `
                                    <div class="profile-check-item">
                                        <span class="profile-check-label">${translatePhrase(item.label)}</span>
                                        <span class="profile-check-status ${item.complete ? 'is-done' : 'is-missing'}">
                                            <i data-lucide="${item.complete ? 'check' : 'clock-3'}" class="w-3 h-3"></i>${item.complete ? translatePhrase('Done') : translatePhrase('Missing')}
                                        </span>
                                    </div>
                                `).join('')}
                            </div>
                        </details>
                    `;
                }).join('');
            };
            renderChecklist('lender-completeness-list', lenderCompleteness);
            renderChecklist('borrower-completeness-list', borrowerCompleteness);

            document.getElementById('profileFullName') && (document.getElementById('profileFullName').value = currentUser.name || '');
            document.getElementById('profilePhone') && (document.getElementById('profilePhone').value = currentUser.phone || '');
            document.getElementById('profileDob') && (document.getElementById('profileDob').value = currentUser.dateOfBirth || '');
            document.getElementById('profileAddress') && (document.getElementById('profileAddress').value = currentUser.residentialAddress || '');
            setStateLgaPair('profileState', 'profileLga', currentUser.state || '', currentUser.lga || '');
            document.getElementById('profileNIN') && (document.getElementById('profileNIN').value = currentUser.nin || '');
            document.getElementById('profileBVN') && (document.getElementById('profileBVN').value = currentUser.bvn || '');
            document.getElementById('profileIdNumber') && (document.getElementById('profileIdNumber').value = currentUser.idNumber || '');
            setBankSelect('profileBankName', currentUser.bankName || '');
            document.getElementById('profileAccountNumber') && (document.getElementById('profileAccountNumber').value = currentUser.accountNumber || '');
            document.getElementById('profileAccountName') && (document.getElementById('profileAccountName').value = currentUser.accountName || '');
            setText('profileIdUploadStatus', currentUser.idUploaded
                ? `ID document uploaded${currentUser.idUploadName ? `: ${currentUser.idUploadName}` : '.'}`
                : 'No ID document uploaded yet.');
            setText('profilePassportUploadStatus', currentUser.passportUploaded
                ? `Passport photo uploaded${currentUser.passportUploadName ? `: ${currentUser.passportUploadName}` : '.'}`
                : 'No passport photo uploaded yet.');
            updateProfileCompletenessFromForm();

            if (typeof lucide !== 'undefined') lucide.createIcons();
        };

        const getBorrowerProfileGate = () => {
            const completeness = getProfileCompleteness(currentUser, 'borrower');
            return {
                completeness,
                isComplete: completeness.percent === 100,
                missingLabels: completeness.items
                    .filter(item => !item.complete)
                    .map(item => item.label)
            };
        };

        const renderRequestProfileGate = () => {
            const alert = document.getElementById('request-profile-alert');
            const copy = document.getElementById('request-profile-alert-copy');
            if (!alert) return true;

            const gate = getBorrowerProfileGate();
            setBankSelect('requestBankName', currentUser?.bankName || '');
            document.getElementById('requestAccountNumber') && (document.getElementById('requestAccountNumber').value = currentUser?.accountNumber || '');
            document.getElementById('requestAccountName') && (document.getElementById('requestAccountName').value = currentUser?.accountName || currentUser?.name || '');
            alert.classList.toggle('hidden', gate.isComplete);
            if (copy) {
                copy.textContent = gate.isComplete
                    ? 'Your borrower profile is complete.'
                    : `Missing: ${gate.missingLabels.join(', ')}.`;
            }
            if (typeof lucide !== 'undefined') lucide.createIcons();
            return gate.isComplete;
        };


        // --- PAGE ROUTING ---
        const pages = document.querySelectorAll('.page');
        const protectedPages = ['dashboard', 'profile', 'new-loan', 'request-loan', 'accept-loan', 'loan-actions'];
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuBtn?.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            const isOpen = !mobileMenu?.classList.contains('hidden');
            mobileMenu?.classList.toggle('hidden', isOpen);
            mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
        });

        const applyFundingPreset = (pageId, preset) => {
            if (!preset) return;
            const targetId = pageId === 'request-loan' ? 'requestFundingType' : pageId === 'new-loan' ? 'fundingType' : '';
            const select = targetId ? document.getElementById(targetId) : null;
            if (!select) return;
            select.value = preset;
            select.dispatchEvent(new Event('change', { bubbles: true }));
            if (pageId === 'request-loan') renderRequestSummary();
            if (pageId === 'new-loan') renderOfferPreview();
        };

        const showPage = (pageId) => {
            if (protectedPages.includes(pageId) && !loggedIn) {
                continueAsDemoUser();
                showToast('Opened Lendily in demo mode.', 'info');
            }

            document.body.classList.toggle('dashboard-page', pageId === 'dashboard');
            document.body.dataset.page = pageId;
            pages.forEach(page => page.classList.toggle('active', page.id === pageId));
            const navPageId = ['new-loan', 'request-loan', 'accept-loan'].includes(pageId) ? 'loan-actions' : pageId;
            document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
                const isActive = link.getAttribute('href') === `#${navPageId}`;
                link.classList.toggle('active', isActive);
                link.toggleAttribute('aria-current', isActive);
            });
            if (pageId !== 'request-loan') {
                const faceVideo = document.getElementById('borrowerFaceVideo');
                faceVideo?.srcObject?.getTracks().forEach(track => track.stop());
                if (faceVideo) faceVideo.srcObject = null;
                document.getElementById('borrower-verification-modal')?.classList.remove('active');
            }
            const resetPageScroll = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            resetPageScroll();
            requestAnimationFrame(resetPageScroll);
            window.setTimeout(resetPageScroll, 80);
            
            if (pageId === 'dashboard' && loggedIn) renderDashboard();
            if (pageId === 'home') renderReferenceHome();
            if (pageId === 'profile' && loggedIn) renderProfile();
            if (pageId === 'request-loan' && loggedIn) {
                renderRequestSummary();
                renderRequestProfileGate();
            }
            if (pageId === 'accept-loan' && loggedIn) {
                renderReviewAgreementInbox();
            }
            if (window.lucide) lucide.createIcons();
        };

        document.addEventListener('click', (e) => {
            const link = e.target.closest('.nav-link');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            const pageId = href.substring(1);
            if (document.getElementById(pageId)) {
                e.preventDefault();
                history.pushState({pageId}, null, `#${pageId}`);
                showPage(pageId);
                applyFundingPreset(pageId, link.dataset.fundingPreset);
                mobileMenu?.classList.add('hidden');
            }
        });
        
        window.addEventListener('popstate', (e) => {
            const pageId = (e.state && e.state.pageId) ? e.state.pageId : 'home';
            showPage(pageId);
        });

        window.addEventListener('hashchange', () => {
            const pageId = window.location.hash.substring(1) || 'home';
            showPage(document.getElementById(pageId) ? pageId : 'home');
        });

        // --- COMPONENT LOGIC ---

        // Testimonial Slider
        const testimonialTrack = document.getElementById('testimonial-track');
        if (testimonialTrack) {
            testimonials.forEach(t => {
                const slide = document.createElement('div');
                slide.className = 'w-full flex-shrink-0 p-4';
                slide.style.minWidth = '100%';
                slide.innerHTML = `<div class="bg-slate-100 p-8 rounded-xl"><p class="text-slate-600 italic mb-6">"${t.quote}"</p><div class="flex items-center"><img src="${t.avatar}" alt="${t.name}" class="w-12 h-12 rounded-full mr-4"><div><p class="font-bold text-slate-800">${t.name}</p><p class="text-sm text-slate-500">${t.role}</p></div></div></div>`;
                testimonialTrack.appendChild(slide);
            });
            let currentIndex = 0;
            let testimonialTimer = null;
            const totalSlides = testimonials.length;
            const prevBtn = document.getElementById('prev-testimonial');
            const nextBtn = document.getElementById('next-testimonial');
            const testimonialSlider = testimonialTrack.closest('#testimonial-slider');
            const updateSlider = () => {
                testimonialTrack.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;
            };
            const moveTestimonials = (direction) => {
                currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
                updateSlider();
            };
            const startTestimonialAutoplay = () => {
                window.clearInterval(testimonialTimer);
                testimonialTimer = window.setInterval(() => moveTestimonials(1), 5000);
            };
            const restartTestimonialAutoplay = () => {
                startTestimonialAutoplay();
            };
            prevBtn?.addEventListener('click', () => {
                moveTestimonials(-1);
                restartTestimonialAutoplay();
            });
            nextBtn?.addEventListener('click', () => {
                moveTestimonials(1);
                restartTestimonialAutoplay();
            });
            testimonialSlider?.addEventListener('mouseenter', () => window.clearInterval(testimonialTimer));
            testimonialSlider?.addEventListener('mouseleave', startTestimonialAutoplay);
            startTestimonialAutoplay();
        }

        // Scroll Animations
        const revealElements = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
        }, { threshold: 0.1 });
        revealElements.forEach(el => observer.observe(el));

        // Contact Form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                showToast('Message sent successfully!', 'success');
                contactForm.reset();
            });
        }

        const newsletterForm = document.getElementById('newsletter-form');
        newsletterForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Newsletter subscription saved.', 'success');
            newsletterForm.reset();
        });

        const changePasswordForm = document.getElementById('change-password-form');
        changePasswordForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            const currentPassword = document.getElementById('current-password');
            const newPassword = document.getElementById('new-password');
            const confirmPassword = document.getElementById('confirm-password');

            if (!currentPassword.value.trim()) return showFieldError(currentPassword, 'Current password is required.');
            if (newPassword.value.length < 6) return showFieldError(newPassword, 'New password must be at least 6 characters.');
            if (newPassword.value !== confirmPassword.value) return showFieldError(confirmPassword, 'Passwords do not match.');
            if (currentPassword.value === newPassword.value) return showFieldError(newPassword, 'Choose a different password.');

            changePasswordForm.reset();
            showToast('Password updated successfully.', 'success');
        });

        const profileDetailsForm = document.getElementById('profile-details-form');
        profileDetailsForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = document.getElementById('profileFullName');
            const phone = document.getElementById('profilePhone');
            const nin = document.getElementById('profileNIN');
            const bvn = document.getElementById('profileBVN');
            const state = document.getElementById('profileState');
            const lga = document.getElementById('profileLga');
            const bankName = document.getElementById('profileBankName');
            const accountNumber = document.getElementById('profileAccountNumber');
            const accountName = document.getElementById('profileAccountName');
            const idUpload = document.getElementById('profileIdUpload');
            const passportUpload = document.getElementById('profilePassportUpload');
            const idUploadFile = idUpload?.files?.[0];
            const passportUploadFile = passportUpload?.files?.[0];

            fullName.value = cleanText(fullName.value);
            if (!fullName.value) return showFieldError(fullName, 'Full name is required.');
            if (!validatePhoneInput(phone, 'Phone number')) return false;
            nin.value = digitsOnly(nin.value);
            bvn.value = digitsOnly(bvn.value);
            accountNumber.value = digitsOnly(accountNumber.value);
            accountName.value = cleanText(accountName.value);
            if (nin.value && !isValidIdNumber(nin.value)) return showFieldError(nin, 'NIN must contain digits only, 11 to 12 numbers.');
            if (bvn.value && !isValidIdNumber(bvn.value)) return showFieldError(bvn, 'BVN must contain digits only, 11 to 12 numbers.');
            if (accountNumber.value && accountNumber.value.length !== 10) return showFieldError(accountNumber, 'Account number must contain exactly 10 digits.');

            currentUser = {
                ...(currentUser || {}),
                name: fullName.value,
                phone: phone.value,
                dateOfBirth: document.getElementById('profileDob').value,
                residentialAddress: cleanText(document.getElementById('profileAddress').value),
                state: state?.value || '',
                lga: lga?.value || '',
                nin: nin.value,
                bvn: bvn.value,
                idNumber: cleanText(document.getElementById('profileIdNumber').value),
                bankName: bankName?.value || '',
                accountNumber: accountNumber.value,
                accountName: accountName.value,
                idUploaded: Boolean(idUploadFile || currentUser?.idUploaded),
                passportUploaded: Boolean(passportUploadFile || currentUser?.passportUploaded),
                idUploadName: idUploadFile?.name || currentUser?.idUploadName || '',
                passportUploadName: passportUploadFile?.name || currentUser?.passportUploadName || ''
            };
            ensureCurrentUserQrIdentity();
            lenderDirectory[currentUser.lendilyId] = currentUser.name;
            borrowerDirectory[currentUser.borrowerId] = { ...(borrowerDirectory[currentUser.borrowerId] || {}), ...currentUser, role: 'borrower' };

            renderProfile();
            renderDashboard();
            renderRequestProfileGate();
            showToast('Profile details saved.', 'success');
        });

        profileDetailsForm?.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', updateProfileCompletenessFromForm);
            input.addEventListener('change', updateProfileCompletenessFromForm);
        });

        const syncProfileUpload = (inputId, uploadedKey, nameKey, statusId, label) => {
            const input = document.getElementById(inputId);
            input?.addEventListener('change', async () => {
                const file = input.files?.[0];
                if (!file) return;
                let passportPhotoDataUrl = currentUser?.passportPhotoDataUrl || '';
                if (inputId === 'profilePassportUpload') {
                    if (!file.type.startsWith('image/')) {
                        input.value = '';
                        setText(statusId, 'Upload rejected. Passport photo must be an image.');
                        showToast('Upload rejected. Passport photo must be an image.', 'error');
                        return;
                    }
                    setText(statusId, 'Checking photo for a visible face...');
                    try {
                        passportPhotoDataUrl = await readFileAsDataUrl(file);
                        const hasFace = await imageHasFace(passportPhotoDataUrl);
                        if (!hasFace) {
                            input.value = '';
                            setText(statusId, 'Upload rejected. No face was detected in this photo.');
                            showToast('Upload rejected. Please upload a clear passport photo with a face.', 'error');
                            return;
                        }
                    } catch (error) {
                        input.value = '';
                        setText(statusId, 'Upload rejected. Face verification could not read this image.');
                        showToast('Upload rejected. Use a clear image with a visible face.', 'error');
                        return;
                    }
                }
                const fullName = document.getElementById('profileFullName');
                const phone = document.getElementById('profilePhone');
                const dob = document.getElementById('profileDob');
                const address = document.getElementById('profileAddress');
                const state = document.getElementById('profileState');
                const lga = document.getElementById('profileLga');
                const nin = document.getElementById('profileNIN');
                const bvn = document.getElementById('profileBVN');
                const idNumber = document.getElementById('profileIdNumber');
                const bankName = document.getElementById('profileBankName');
                const accountNumber = document.getElementById('profileAccountNumber');
                const accountName = document.getElementById('profileAccountName');

                currentUser = {
                    ...(currentUser || {}),
                    name: fullName ? cleanText(fullName.value) : currentUser?.name,
                    phone: phone ? phone.value : currentUser?.phone,
                    dateOfBirth: dob ? dob.value : currentUser?.dateOfBirth,
                    residentialAddress: address ? cleanText(address.value) : currentUser?.residentialAddress,
                    state: state ? state.value : currentUser?.state,
                    lga: lga ? lga.value : currentUser?.lga,
                    nin: nin ? digitsOnly(nin.value) : currentUser?.nin,
                    bvn: bvn ? digitsOnly(bvn.value) : currentUser?.bvn,
                    idNumber: idNumber ? cleanText(idNumber.value) : currentUser?.idNumber,
                    bankName: bankName ? bankName.value : currentUser?.bankName,
                    accountNumber: accountNumber ? digitsOnly(accountNumber.value) : currentUser?.accountNumber,
                    accountName: accountName ? cleanText(accountName.value) : currentUser?.accountName,
                    [uploadedKey]: true,
                    [nameKey]: file.name,
                    ...(inputId === 'profilePassportUpload' ? { passportPhotoDataUrl } : {})
                };
                setText(statusId, `${label} uploaded: ${file.name}`);
                renderProfile();
                renderDashboard();
                renderRequestProfileGate();
            });
        };

        syncProfileUpload('profileIdUpload', 'idUploaded', 'idUploadName', 'profileIdUploadStatus', 'ID document');
        syncProfileUpload('profilePassportUpload', 'passportUploaded', 'passportUploadName', 'profilePassportUploadStatus', 'Passport photo');

        document.querySelectorAll('.footer-action').forEach(button => {
            button.addEventListener('click', () => showToast(button.dataset.action || 'Preview opened.', 'info'));
        });

        
        // --- LOAN FORMS LOGIC ---
        const syncFundingInputs = (fundingSelectId, rateInputId, periodSelectId, purposeLabelId, repaymentFieldsId, rateLabelId, interestFieldsId, context) => {
            const fundingSelect = document.getElementById(fundingSelectId);
            const rateInput = document.getElementById(rateInputId);
            const periodSelect = document.getElementById(periodSelectId);
            const purposeLabel = document.getElementById(purposeLabelId);
            const repaymentFields = document.getElementById(repaymentFieldsId);
            const rateLabel = document.getElementById(rateLabelId);
            const interestFields = document.getElementById(interestFieldsId);
            if (!fundingSelect || !rateInput || !periodSelect || !purposeLabel || !repaymentFields || !rateLabel || !interestFields) return;

            const update = () => {
                const isGift = fundingSelect.value === 'gift';
                const isHalal = fundingSelect.value === 'halal';
                const repaymentInputs = repaymentFields.querySelectorAll('input, select');
                const interestInputs = interestFields.querySelectorAll('input, select');
                interestFields.classList.toggle('hidden', isGift);
                interestInputs.forEach(input => {
                    input.disabled = isGift;
                    input.required = !isGift;
                });
                rateInput.disabled = isGift;
                periodSelect.disabled = isGift || isHalal;
                repaymentFields.classList.toggle('hidden', isGift);
                repaymentInputs.forEach(input => {
                    input.disabled = isGift;
                    input.required = !isGift;
                });
                if (isGift) rateInput.value = 0;
                if (isGift || isHalal) periodSelect.value = 'period';
                purposeLabel.textContent = isGift ? 'Gift Purpose' : 'Purpose';
                rateLabel.textContent = isHalal ? t('form.markup') : t('form.interestRate');

                if (context === 'offer') {
                    setHtml('borrowerLookupIdLabel', `${isGift ? "Receiver's ID" : 'Borrower ID'} <span class="font-normal text-slate-400">(Optional)</span>`);
                    setText('findBorrowerBtn', isGift ? 'Find Receiver' : 'Find Borrower');
                    setText('borrowerNameLabel', isGift ? "Recipient's Full Name" : "Borrower's Full Name");
                    setText('borrowerPhoneLabel', isGift ? "Recipient's Phone" : "Borrower's Phone");
                    setHtml('borrowerEmailLabel', `${isGift ? "Recipient's" : "Borrower's"} Email Address <span class="font-normal text-slate-400">(Optional)</span>`);
                    setText('loanAmountLabel', isGift ? 'Gift Amount (NGN)' : 'Loan Amount (NGN)');
                    setText('borrowerLookupHint', isGift ? 'Use a saved receiver ID to fill name, phone, and email automatically.' : 'Use a saved borrower ID to fill name, phone, and email automatically.');
                    setText('showLenderDetailsLabel', isGift ? 'Show my contact details to the recipient on the receipt.' : 'Show my contact details to the borrower on the receipt.');
                    renderOfferPreview();
                }

                if (context === 'request') {
                    setText('requestLenderPaygoIdLabel', isGift ? "Gift Giver's Lendily ID" : "Lender's Lendily ID");
                    setText('requestAmountLabel', isGift ? 'Requested Gift Amount (NGN)' : 'Requested Amount (NGN)');
                    renderRequestSummary();
                }
            };

            fundingSelect.addEventListener('change', update);
            update();
        };

        syncFundingInputs('fundingType', 'interestRate', 'interestPeriod', 'loanPurposeLabel', 'repaymentFields', 'interestRateLabel', 'interestFields', 'offer');
        syncFundingInputs('requestFundingType', 'requestInterestRate', 'requestInterestPeriod', 'requestLoanPurposeLabel', 'requestRepaymentFields', 'requestInterestRateLabel', 'requestInterestFields', 'request');

        const setupInputCorrection = () => {
            ['borrowerPhone', 'acceptBorrowerPhone', 'login-phone', 'register-phone', 'borrowerNIN', 'borrowerBVN', 'reviewBorrowerPin', 'profilePhone', 'profileNIN', 'profileBVN', 'profileAccountNumber', 'borrowerAccountNumber', 'requestAccountNumber', 'acceptAccountNumber'].forEach(id => {
                const input = document.getElementById(id);
                input?.addEventListener('input', () => {
                    const maxLength = parseInt(input.getAttribute('maxlength') || '999', 10);
                    const cleaned = digitsOnly(input.value).slice(0, maxLength);
                    if (input.value !== cleaned) input.value = cleaned;
                    input.classList.remove('border-red-500');
                });
            });

            ['borrowerName', 'borrowerAccountName', 'requestAccountName', 'acceptAccountName', 'register-name', 'name', 'borrowerIdNumber', 'profileFullName', 'profileAddress', 'profileIdNumber', 'profileAccountName'].forEach(id => {
                const input = document.getElementById(id);
                input?.addEventListener('blur', () => { input.value = cleanText(input.value); });
            });

            document.getElementById('borrowerLookupId')?.addEventListener('blur', (event) => {
                event.target.value = normalizeBorrowerId(event.target.value);
            });

            document.getElementById('reviewBorrowerId')?.addEventListener('blur', (event) => {
                event.target.value = normalizeBorrowerId(event.target.value);
            });

            ['loanAmount', 'interestRate', 'profitExpected', 'requestAmount', 'requestInterestRate', 'requestProfitExpected'].forEach(id => {
                const input = document.getElementById(id);
                input?.addEventListener('input', () => input.classList.remove('border-red-500'));
            });

            ['loanAmount', 'profitExpected', 'requestAmount', 'requestProfitExpected'].forEach(id => {
                const input = document.getElementById(id);
                input?.addEventListener('input', () => {
                    const formatted = formatAmountValue(input.value);
                    if (input.value !== formatted) input.value = formatted;
                });
            });

            const todayDate = new Date();
            todayDate.setMinutes(todayDate.getMinutes() - todayDate.getTimezoneOffset());
            const today = todayDate.toISOString().slice(0, 10);
            ['repaymentDate', 'requestRepaymentDate'].forEach(id => {
                const input = document.getElementById(id);
                if (input) input.min = today;
            });
        };

        setupInputCorrection();
        setupProfitRateSync({
            amountId: 'loanAmount',
            rateId: 'interestRate',
            profitId: 'profitExpected',
            periodId: 'interestPeriod',
            dueDateId: 'repaymentDate',
            fundingTypeId: 'fundingType',
            buildDraft: buildOfferDraft,
            afterUpdate: renderOfferPreview
        });
        setupProfitRateSync({
            amountId: 'requestAmount',
            rateId: 'requestInterestRate',
            profitId: 'requestProfitExpected',
            periodId: 'requestInterestPeriod',
            dueDateId: 'requestRepaymentDate',
            fundingTypeId: 'requestFundingType',
            buildDraft: buildRequestDraft,
            afterUpdate: renderRequestSummary
        });

        const validateOfferForm = () => {
            const fundingType = document.getElementById('fundingType').value;
            const borrowerName = document.getElementById('borrowerName');
            const borrowerPhone = document.getElementById('borrowerPhone');
            const borrowerEmail = document.getElementById('borrowerEmail');
            const borrowerLookup = document.getElementById('borrowerLookupId');
            const accountNumber = document.getElementById('borrowerAccountNumber');
            const accountName = document.getElementById('borrowerAccountName');
            const amount = document.getElementById('loanAmount');
            const details = document.getElementById('transactionDetails');
            const rate = document.getElementById('interestRate');
            const dueDate = document.getElementById('repaymentDate');
            const partyLabel = fundingType === 'gift' ? 'Recipient' : 'Borrower';

            borrowerName.value = cleanText(borrowerName.value);
            if (!borrowerName.value) return showFieldError(borrowerName, `${partyLabel}'s full name is required.`);
            if (!validatePhoneInput(borrowerPhone, `${partyLabel}'s phone`)) return false;
            if (!validateOptionalEmail(borrowerEmail, `${partyLabel}'s email address`)) return false;
            if (isSamePerson({ name: borrowerName.value, phone: borrowerPhone.value, email: borrowerEmail.value, borrowerId: borrowerLookup?.value || '' })) {
                return showFieldError(borrowerName, `${partyLabel} cannot be the same person as the lender.`);
            }
            accountNumber.value = digitsOnly(accountNumber.value);
            if (accountNumber.value.length !== 10) return showFieldError(accountNumber, 'Account number must contain exactly 10 digits.');
            if (accountName) accountName.value = cleanText(accountName.value) || borrowerName.value;
            if (!requirePositiveNumber(amount, 'Amount')) return false;
            details.value = cleanText(details.value);
            if (fundingType !== 'gift' && parseFloat(rate.value || '0') < 0) return showFieldError(rate, 'Rate cannot be negative.');
            if (fundingType !== 'gift' && !validateDueDate(dueDate)) return false;
            return true;
        };

        const validateRequestForm = () => {
            const fundingType = document.getElementById('requestFundingType').value;
            const paygoId = document.getElementById('requestLenderPaygoId');
            const accountNumber = document.getElementById('requestAccountNumber');
            const accountName = document.getElementById('requestAccountName');
            const amount = document.getElementById('requestAmount');
            const details = document.getElementById('requestTransactionDetails');
            const rate = document.getElementById('requestInterestRate');
            const dueDate = document.getElementById('requestRepaymentDate');
            const partyLabel = fundingType === 'gift' ? 'Gift giver' : 'Lender';

            paygoId.value = normalizeLendilyId(paygoId.value);
            if (!/^LN-[A-Z0-9-]{2,}$/.test(paygoId.value)) return showFieldError(paygoId, `${partyLabel}'s Lendily ID should look like LN-JANE.`);
            if (isSamePerson({ lendilyId: paygoId.value })) return showFieldError(paygoId, `You cannot request funds from yourself.`);
            if (!document.getElementById('requestBankName')?.value) return showFieldError(document.getElementById('requestBankName'), 'Select the bank account that should receive the funds.');
            accountNumber.value = digitsOnly(accountNumber.value);
            if (accountNumber.value.length !== 10) return showFieldError(accountNumber, 'Account number must contain exactly 10 digits.');
            if (accountName) accountName.value = cleanText(accountName.value) || currentUser?.accountName || currentUser?.name || '';
            if (!requirePositiveNumber(amount, 'Requested amount')) return false;
            details.value = cleanText(details.value);
            if (fundingType !== 'gift' && parseFloat(rate.value || '0') < 0) return showFieldError(rate, 'Rate cannot be negative.');
            if (fundingType !== 'gift' && !validateDueDate(dueDate)) return false;
            return true;
        };

        // New Loan Form (Lender)
        const newLoanForm = document.getElementById('new-loan-form');
        if(newLoanForm) {
            const borrowerLookupId = document.getElementById('borrowerLookupId');
            const borrowerLookupHint = document.getElementById('borrowerLookupHint');
            const lenderLegalConsent = document.getElementById('lenderLegalConsent');
            const showLenderDetails = document.getElementById('showLenderDetails');
            const progressFill = document.getElementById('newLoanProgressFill');
            const progressText = document.getElementById('newLoanProgressText');
            let showLenderDetailsTouched = false;
            const newLoanProgressSections = {
                contact: ['borrowerName', 'borrowerPhone'],
                bank: ['borrowerBankName', 'borrowerAccountNumber'],
                loan: ['fundingType', 'loanPurpose', 'loanAmount', 'interestRate', 'interestPeriod', 'repaymentDate', 'repaymentPlan'],
                summary: ['showLenderDetailsChoice', 'lenderLegalConsent']
            };

            const isFieldComplete = (id) => {
                if (id === 'showLenderDetailsChoice') return showLenderDetailsTouched;
                const field = document.getElementById(id);
                if (!field) return false;
                if (field.type === 'checkbox') return field.checked;
                if (id === 'repaymentDate' || id === 'repaymentPlan') {
                    return document.getElementById('fundingType')?.value === 'gift' || Boolean(field.value);
                }
                if (id === 'loanAmount') return parseCurrencyAmount(field.value) > 0;
                return Boolean(String(field.value || '').trim());
            };

            const updateNewLoanProgress = () => {
                let completed = 0;
                let total = 0;
                Object.entries(newLoanProgressSections).forEach(([section, ids]) => {
                    const sectionCompleted = ids.filter(isFieldComplete).length;
                    total += ids.length;
                    completed += sectionCompleted;
                    const status = document.getElementById(`${section}ProgressStatus`);
                    if (status) status.textContent = `${sectionCompleted}/${ids.length}`;
                    const sectionCard = document.querySelector(`[data-progress-section="${section}"]`);
                    sectionCard?.classList.toggle('is-complete', sectionCompleted === ids.length);
                });
                const percent = total ? Math.round((completed / total) * 100) : 0;
                if (progressFill) progressFill.style.width = `${percent}%`;
                if (progressText) progressText.textContent = `${percent}%`;
            };

            showLenderDetails?.addEventListener('change', () => {
                showLenderDetailsTouched = true;
                updateNewLoanProgress();
            });

            lenderLegalConsent?.addEventListener('change', (event) => {
                if (!event.target.checked) {
                    resetLegalConsentState('lender');
                    updateNewLoanProgress();
                    return;
                }
                if (!lenderLegalAccepted) {
                    event.target.checked = false;
                    openLegalConsentModal('lender', 'terms');
                }
                updateNewLoanProgress();
            });

            const fillBorrowerFromDirectory = () => {
                const isGiftFlow = document.getElementById('fundingType')?.value === 'gift';
                const partyName = isGiftFlow ? 'receiver' : 'borrower';
                const partyLabel = isGiftFlow ? 'Receiver' : 'Borrower';
                const normalizedId = normalizeBorrowerId(borrowerLookupId?.value || '');
                if (borrowerLookupId) borrowerLookupId.value = normalizedId;
                if (!normalizedId) {
                    borrowerLookupHint && (borrowerLookupHint.textContent = `Use a saved ${partyName} ID to fill name, phone, and email automatically.`);
                    return;
                }

                const borrower = borrowerDirectory[normalizedId];
                if (!borrower) {
                    borrowerLookupHint && (borrowerLookupHint.textContent = `No ${partyName} found for that ID. Enter details manually or check the ID.`);
                    showToast(`${partyLabel} ID not found.`, 'error');
                    return;
                }

                if (isSamePerson({ name: borrower.name, phone: borrower.phone, email: borrower.email, borrowerId: normalizedId })) {
                    borrowerLookupHint && (borrowerLookupHint.textContent = 'You cannot create an agreement with yourself.');
                    showToast('Lender cannot lend to self.', 'error');
                    return;
                }
                document.getElementById('borrowerName').value = borrower.name || '';
                document.getElementById('borrowerPhone').value = borrower.phone || '';
                document.getElementById('borrowerEmail').value = borrower.email || '';
                setBankSelect('borrowerBankName', borrower.bankName || '');
                document.getElementById('borrowerAccountNumber').value = borrower.accountNumber || '';
                document.getElementById('borrowerAccountName').value = borrower.accountName || borrower.name || '';
                borrowerLookupHint && (borrowerLookupHint.textContent = `${borrower.name} loaded from ${normalizedId}.`);
                renderOfferPreview();
                updateNewLoanProgress();
                showToast(`${partyLabel} details loaded.`, 'success');
            };

            document.getElementById('findBorrowerBtn')?.addEventListener('click', fillBorrowerFromDirectory);
            document.getElementById('scanBorrowerQrBtn')?.addEventListener('click', () => openQrScanner('borrower'));
            document.querySelectorAll('#new-loan-form [data-legal-open]').forEach(button => {
                button.addEventListener('click', () => openLegalConsentModal('lender', button.dataset.legalOpen));
            });
            borrowerLookupId?.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    fillBorrowerFromDirectory();
                }
            });

            ['fundingType', 'loanPurpose', 'borrowerName', 'loanAmount', 'interestRate', 'profitExpected', 'interestPeriod', 'repaymentDate', 'repaymentPlan'].forEach(id => {
                const input = document.getElementById(id);
                input?.addEventListener('input', renderOfferPreview);
                input?.addEventListener('change', renderOfferPreview);
            });
            newLoanForm.querySelectorAll('input, select, textarea').forEach(input => {
                input.addEventListener('input', updateNewLoanProgress);
                input.addEventListener('change', updateNewLoanProgress);
            });
            renderOfferPreview();
            updateNewLoanProgress();

            newLoanForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (!lenderLegalAccepted || !lenderLegalConsent?.checked) {
                    lenderLegalConsent?.closest('details')?.setAttribute('open', '');
                    openLegalConsentModal('lender', 'terms');
                    showToast('Review and agree to the Terms and Conditions before creating an offer.', 'info');
                    return;
                }
                const firstInvalid = newLoanForm.querySelector(':invalid');
                firstInvalid?.closest('details')?.setAttribute('open', '');
                if (!newLoanForm.reportValidity() || !validateOfferForm()) return;
                const newLoanId = 'LN' + String(Math.floor(Math.random() * 900) + 100).padStart(3, '0');
                const borrowerId = normalizeBorrowerId(document.getElementById('borrowerLookupId')?.value || '');
                const matchedBorrower = borrowerDirectory[borrowerId];
                const newLoan = {
                    id: newLoanId,
                    lender: currentUser.name,
                    lenderEmail: currentUser.email,
                    lenderPhone: currentUser.phone,
                    borrower: cleanText(document.getElementById('borrowerName').value),
                    borrowerId,
                    borrowerPin: matchedBorrower?.pin || '',
                    borrowerEmail: document.getElementById('borrowerEmail').value || '',
                    borrowerPhone: document.getElementById('borrowerPhone').value,
                    borrowerState: matchedBorrower?.state || '',
                    borrowerLga: matchedBorrower?.lga || '',
                    borrowerBankName: document.getElementById('borrowerBankName').value,
                    borrowerAccountNumber: document.getElementById('borrowerAccountNumber').value,
                    borrowerAccountName: cleanText(document.getElementById('borrowerAccountName').value),
                    amount: parseCurrencyAmount(document.getElementById('loanAmount').value),
                    dueDate: document.getElementById('fundingType').value === 'gift' ? null : document.getElementById('repaymentDate').value,
                    interestRate: document.getElementById('fundingType').value === 'gift' ? 0 : parseFloat(document.getElementById('interestRate').value || '0'),
                    interestPeriod: document.getElementById('fundingType').value === 'halal' ? 'period' : document.getElementById('interestPeriod').value,
                    fundingType: document.getElementById('fundingType').value,
                    loanPurpose: document.getElementById('loanPurpose').value,
                    transactionDetails: cleanText(document.getElementById('transactionDetails').value),
                    repaymentPlan: document.getElementById('fundingType').value === 'gift' ? null : document.getElementById('repaymentPlan').value,
                    status: 'pending_borrower_acceptance',
                    initiatedBy: 'lender',
                    showLenderDetails: document.getElementById('showLenderDetails').checked
                };
                loans.unshift(newLoan);
                showToast(`Offer created. Share this Lendily ID with the borrower: ${newLoanId}`, 'success');
                newLoanForm.reset();
                resetLegalConsentState('lender');
                setBankSelect('borrowerBankName');
                borrowerLookupHint && (borrowerLookupHint.textContent = 'Use a saved borrower ID to fill name, phone, and email automatically.');
                document.getElementById('fundingType').dispatchEvent(new Event('change'));
                renderReferenceHome();
                showPage('dashboard');
            });
        }

        const requestLoanForm = document.getElementById('request-loan-form');
        if(requestLoanForm) {
            let borrowerFaceVerified = false;
            let borrowerFaceStream = null;
            let faceApiModelsLoaded = false;

            const requestLegalConsent = document.getElementById('requestLegalConsent');
            const requestProgressFill = document.getElementById('requestLoanProgressFill');
            const requestProgressText = document.getElementById('requestLoanProgressText');
            const requestBankSource = document.getElementById('requestBankSource');
            const requestManualBankFields = document.getElementById('requestManualBankFields');
            const requestCurrentBankPreview = document.getElementById('requestCurrentBankPreview');
            const requestCurrentBankCopy = document.getElementById('requestCurrentBankCopy');
            const requestProgressSections = {
                bank: ['requestBankSource', 'requestBankName', 'requestAccountNumber'],
                loanDetails: ['requestFundingType', 'requestLoanPurpose', 'requestAmount', 'requestInterestRate', 'requestInterestPeriod', 'requestRepaymentDate', 'requestRepaymentPlan'],
                summary: ['requestLegalConsent'],
                lender: ['requestLenderPaygoId']
            };

            const isRequestFieldComplete = (id) => {
                if (id === 'borrowerFaceVerified') return borrowerFaceVerified;
                const field = document.getElementById(id);
                if (!field) return false;
                if (field.type === 'checkbox') return field.checked;
                if (id === 'requestRepaymentDate' || id === 'requestRepaymentPlan') {
                    return document.getElementById('requestFundingType')?.value === 'gift' || Boolean(field.value);
                }
                if (id === 'requestAmount') return parseCurrencyAmount(field.value) > 0;
                return Boolean(String(field.value || '').trim());
            };

            const getProfileAccountName = () => cleanText(currentUser?.accountName || currentUser?.name || '');

            const syncRequestBankSource = () => {
                const bankName = document.getElementById('requestBankName');
                const accountNumber = document.getElementById('requestAccountNumber');
                const accountName = document.getElementById('requestAccountName');
                const hasProfileAccount = Boolean(currentUser?.bankName && currentUser?.accountNumber);
                const useCurrent = requestBankSource?.value !== 'manual' && hasProfileAccount;

                if (requestBankSource && requestBankSource.value !== 'manual' && !hasProfileAccount) {
                    requestBankSource.value = 'manual';
                }

                if (useCurrent) {
                    setBankSelect('requestBankName', currentUser.bankName || '');
                    if (accountNumber) accountNumber.value = currentUser.accountNumber || '';
                    if (accountName) accountName.value = getProfileAccountName();
                } else if (accountName) {
                    accountName.value = getProfileAccountName();
                }

                requestManualBankFields?.classList.toggle('is-hidden', useCurrent);
                requestCurrentBankPreview?.classList.toggle('is-hidden', !useCurrent);
                if (requestCurrentBankCopy) {
                    requestCurrentBankCopy.textContent = useCurrent
                        ? `${currentUser.bankName} • ${currentUser.accountNumber}`
                        : 'Choose a bank and enter the receiving account number below.';
                }
                updateRequestLoanProgress();
            };

            const updateRequestLoanProgress = () => {
                let completed = 0;
                let total = 0;
                Object.entries(requestProgressSections).forEach(([section, ids]) => {
                    const sectionCompleted = ids.filter(isRequestFieldComplete).length;
                    total += ids.length;
                    completed += sectionCompleted;
                    const status = document.getElementById(`request${section.charAt(0).toUpperCase()}${section.slice(1)}ProgressStatus`);
                    if (status) status.textContent = `${sectionCompleted}/${ids.length}`;
                    const sectionCard = document.querySelector(`[data-request-progress-section="${section}"]`);
                    sectionCard?.classList.toggle('is-complete', sectionCompleted === ids.length);
                });
                const percent = total ? Math.round((completed / total) * 100) : 0;
                if (requestProgressFill) requestProgressFill.style.width = `${percent}%`;
                if (requestProgressText) requestProgressText.textContent = `${percent}%`;
            };

            document.getElementById('scanLenderQrBtn')?.addEventListener('click', () => openQrScanner('lender'));
            requestBankSource?.addEventListener('change', syncRequestBankSource);

            document.querySelectorAll('#request-loan-form [data-legal-open]').forEach(button => {
                button.addEventListener('click', () => openLegalConsentModal('request', button.dataset.legalOpen));
            });

            requestLegalConsent?.addEventListener('change', (event) => {
                if (!event.target.checked) {
                    resetLegalConsentState('request');
                    updateRequestLoanProgress();
                    return;
                }
                if (!requestLegalAccepted) {
                    event.target.checked = false;
                    openLegalConsentModal('request', 'terms');
                }
                updateRequestLoanProgress();
            });

            const stopBorrowerFaceCamera = () => {
                borrowerFaceStream?.getTracks().forEach(track => track.stop());
                borrowerFaceStream = null;
            };

            const openBorrowerVerificationModal = () => {
                document.getElementById('borrower-verification-modal')?.classList.add('active');
                if (typeof lucide !== 'undefined') lucide.createIcons();
            };

            const closeBorrowerVerificationModal = () => {
                document.getElementById('borrower-verification-modal')?.classList.remove('active');
                stopBorrowerFaceCamera();
            };

            document.getElementById('borrowerVerificationClose')?.addEventListener('click', () => {
                closeBorrowerVerificationModal();
                setFaceVerificationStatus('pending', 'Not verified');
            });

            const loadFaceApiModels = async () => {
                if (faceApiModelsLoaded) return true;
                if (!window.faceapi?.nets?.tinyFaceDetector) return false;
                await window.faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/');
                await window.faceapi.nets.faceLandmark68TinyNet.loadFromUri('https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/');
                await window.faceapi.nets.faceExpressionNet.loadFromUri('https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/');
                faceApiModelsLoaded = true;
                return true;
            };

            const detectBorrowerFaceFrame = async (video) => {
                try {
                    if (await loadFaceApiModels()) {
                        return await window.faceapi.detectSingleFace(
                            video,
                            new window.faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.45 })
                        ).withFaceLandmarks(true).withFaceExpressions();
                    }
                } catch (error) {
                    console.warn('Face API verification failed, trying native detector.', error);
                }

                if ('FaceDetector' in window) {
                    const detector = new window.FaceDetector({ fastMode: true, maxDetectedFaces: 1 });
                    const faces = await detector.detect(video);
                    return faces.length ? { detection: { box: faces[0].boundingBox }, nativeOnly: true } : null;
                }
                return null;
            };

            const evaluateLivenessStep = (result, step, baseline = {}) => {
                if (!result) return false;
                if (result.nativeOnly) return step !== 'smile';
                if (step === 'smile') return (result.expressions?.happy || 0) > 0.35;
                if (step === 'center') return true;
                const nose = result.landmarks?.getNose?.()?.[3];
                const box = result.detection?.box;
                if (!nose || !box || baseline.noseX === undefined) return false;
                const delta = (nose.x - baseline.noseX) / box.width;
                return step === 'left' ? delta < -0.045 : delta > 0.045;
            };

            const waitForLivenessStep = async (video, step, baseline = {}) => {
                const deadline = Date.now() + 6500;
                let latestResult = null;
                while (Date.now() < deadline) {
                    latestResult = await detectBorrowerFaceFrame(video);
                    if (evaluateLivenessStep(latestResult, step, baseline)) return latestResult;
                    await new Promise(resolve => setTimeout(resolve, 260));
                }
                return null;
            };

            const verifyBorrowerFace = async () => {
                const video = document.getElementById('borrowerFaceVideo');
                if (!video || !navigator.mediaDevices?.getUserMedia) {
                    setFaceVerificationStatus('failed', 'Live camera is not available in this browser.');
                    showToast('Live camera is not available in this browser.', 'error');
                    return false;
                }

                borrowerFaceVerified = false;
                setFaceVerificationStatus('pending', 'Opening camera...');

                try {
                    stopBorrowerFaceCamera();
                    borrowerFaceStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
                    video.srcObject = borrowerFaceStream;
                    await video.play();
                    setFaceVerificationStatus('pending', 'Center your face in the portrait frame.');
                    await new Promise(resolve => setTimeout(resolve, 900));

                    const centerResult = await waitForLivenessStep(video, 'center');
                    if (!centerResult) {
                        setFaceVerificationStatus('failed', 'No face detected. Center your face and try again.');
                        showToast('No live face detected. Please try again.', 'error');
                        return false;
                    }

                    const nose = centerResult.landmarks?.getNose?.()?.[3];
                    const baseline = {
                        noseX: nose?.x,
                        nativeOnly: centerResult.nativeOnly
                    };

                    setFaceVerificationStatus('pending', 'Turn your head left.');
                    const leftResult = await waitForLivenessStep(video, 'left', baseline);
                    if (!leftResult) {
                        setFaceVerificationStatus('failed', 'Left turn was not detected. Try again.');
                        showToast('Left turn was not detected.', 'error');
                        return false;
                    }

                    setFaceVerificationStatus('pending', 'Turn your head right.');
                    const rightResult = await waitForLivenessStep(video, 'right', baseline);
                    if (!rightResult) {
                        setFaceVerificationStatus('failed', 'Right turn was not detected. Try again.');
                        showToast('Right turn was not detected.', 'error');
                        return false;
                    }

                    setFaceVerificationStatus('pending', baseline.nativeOnly ? 'Hold still for final live check.' : 'Smile for the final check.');
                    const smileResult = await waitForLivenessStep(video, baseline.nativeOnly ? 'center' : 'smile', baseline);
                    if (!smileResult) {
                        setFaceVerificationStatus('failed', 'Smile was not detected. Try again.');
                        showToast('Smile was not detected.', 'error');
                        return false;
                    }

                    borrowerFaceVerified = true;
                    currentUser = {
                        ...(currentUser || {}),
                        faceVerifiedAt: new Date().toISOString()
                    };
                    setFaceVerificationStatus('verified', 'Liveness verified for this request.');
                    showToast('Borrower face verified.', 'success');
                    stopBorrowerFaceCamera();
                    return true;
                } catch (error) {
                    setFaceVerificationStatus('failed', 'Camera permission is required for borrower verification.');
                    showToast('Camera permission is required for borrower verification.', 'error');
                    return false;
                } finally {
                    stopBorrowerFaceCamera();
                }
            };

            window.lendilyFaceVerification = {
                open: (options = {}) => {
                    setText('borrower-verification-title', options.title || 'Borrower Verification');
                    setText('faceVerificationHint', options.hint || 'You will be asked to center your face, turn left, turn right, and smile.');
                    const heading = document.querySelector('#faceVerificationCard .verification-card-head h3');
                    const copy = document.querySelector('#faceVerificationCard .verification-card-head span');
                    if (heading) heading.textContent = options.cardTitle || 'Live Face Check';
                    if (copy) copy.textContent = options.cardCopy || 'Confirm a real borrower is making this funding request.';
                    borrowerFaceVerified = false;
                    setFaceVerificationStatus('pending', 'Not verified');
                    openBorrowerVerificationModal();
                },
                verify: verifyBorrowerFace,
                close: closeBorrowerVerificationModal,
                reset: () => {
                    borrowerFaceVerified = false;
                    setFaceVerificationStatus('pending', 'Not verified');
                    stopBorrowerFaceCamera();
                }
            };

            ['requestFundingType', 'requestLenderPaygoId', 'requestLoanPurpose', 'requestAmount', 'requestInterestRate', 'requestProfitExpected', 'requestInterestPeriod', 'requestRepaymentDate', 'requestRepaymentPlan'].forEach(id => {
                const input = document.getElementById(id);
                input?.addEventListener('input', renderRequestSummary);
                input?.addEventListener('change', renderRequestSummary);
            });
            requestLoanForm.querySelectorAll('input, select, textarea').forEach(input => {
                input.addEventListener('input', updateRequestLoanProgress);
                input.addEventListener('change', updateRequestLoanProgress);
            });
            renderRequestSummary();
            renderRequestProfileGate();
            setBankSelect('requestBankName', currentUser?.bankName || '');
            document.getElementById('requestAccountNumber') && (document.getElementById('requestAccountNumber').value = currentUser?.accountNumber || '');
            document.getElementById('requestAccountName') && (document.getElementById('requestAccountName').value = currentUser?.accountName || currentUser?.name || '');
            syncRequestBankSource();

            const handleRequestLoanSubmit = async (e) => {
                e?.preventDefault();
                const gate = getBorrowerProfileGate();
                if (!gate.isComplete) {
                    renderRequestProfileGate();
                    showTransientErrorModal(
                        'Complete your borrower profile first. The missing details are listed on this page, and Profile will open next.',
                        'Profile incomplete',
                        { duration: 3200, afterDismiss: () => showPage('profile') }
                    );
                    return;
                }
                if (!requestLegalAccepted || !requestLegalConsent?.checked) {
                    requestLegalConsent?.closest('details')?.setAttribute('open', '');
                    openLegalConsentModal('request', 'terms');
                    showTransientErrorModal('Review and agree to the Terms and Privacy Statement before sending your request.', 'Agreement required');
                    showToast('Review and agree to the Terms and Privacy Statement before sending your request.', 'info');
                    return;
                }
                const firstInvalid = requestLoanForm.querySelector(':invalid');
                firstInvalid?.closest('details')?.setAttribute('open', '');
                if (firstInvalid) {
                    firstInvalid.focus();
                    showTransientErrorModal(firstInvalid.validationMessage || 'Complete the highlighted required field before sending your request.', 'Missing details');
                    return;
                }
                if (!validateRequestForm()) {
                    showTransientErrorModal('Fix the highlighted field before sending your request.', 'Check request details');
                    return;
                }
                const submitButton = requestLoanForm.querySelector('button[type="submit"]');
                submitButton && (submitButton.disabled = true);
                openBorrowerVerificationModal();
                setFaceVerificationStatus('pending', 'Opening camera...');
                await new Promise(resolve => requestAnimationFrame(resolve));
                const verified = borrowerFaceVerified || await verifyBorrowerFace();
                submitButton && (submitButton.disabled = false);
                if (!verified) {
                    showTransientErrorModal('Borrower verification did not complete. Allow camera access and try again.', 'Verification needed');
                    return;
                }
                closeBorrowerVerificationModal();
                const newLoanId = 'LN' + String(Math.floor(Math.random() * 900) + 100).padStart(3, '0');
                const lenderId = normalizeLendilyId(document.getElementById('requestLenderPaygoId').value);
                const requesterProfile = currentUser;
                const requestedLoan = {
                    id: newLoanId,
                    lender: resolveLenderNameFromId(lenderId),
                    lenderLendilyId: lenderId,
                    lenderEmail: `${lenderId.toLowerCase()}@lendily.local`,
                    lenderPhone: 'Pending lender profile',
                    borrower: currentUser.name,
                    borrowerId: requesterProfile?.borrowerId || '',
                    borrowerPin: requesterProfile?.pin || '',
                    borrowerState: currentUser?.state || '',
                    borrowerLga: currentUser?.lga || '',
                    borrowerBankName: document.getElementById('requestBankName').value,
                    borrowerAccountNumber: document.getElementById('requestAccountNumber').value,
                    borrowerAccountName: cleanText(document.getElementById('requestAccountName').value),
                    amount: parseCurrencyAmount(document.getElementById('requestAmount').value),
                    dueDate: document.getElementById('requestFundingType').value === 'gift' ? null : document.getElementById('requestRepaymentDate').value,
                    interestRate: document.getElementById('requestFundingType').value === 'gift' ? 0 : parseFloat(document.getElementById('requestInterestRate').value || '0'),
                    interestPeriod: document.getElementById('requestFundingType').value === 'halal' ? 'period' : document.getElementById('requestInterestPeriod').value,
                    fundingType: document.getElementById('requestFundingType').value,
                    loanPurpose: document.getElementById('requestLoanPurpose').value,
                    transactionDetails: cleanText(document.getElementById('requestTransactionDetails').value),
                    repaymentPlan: document.getElementById('requestFundingType').value === 'gift' ? null : document.getElementById('requestRepaymentPlan').value,
                    borrowerFaceVerified: true,
                    borrowerFaceVerifiedAt: currentUser?.faceVerifiedAt || new Date().toISOString(),
                    status: 'pending_lender_acceptance',
                    initiatedBy: 'borrower',
                    showLenderDetails: false
                };
                loans.unshift(requestedLoan);
                showToast(`Request sent to lender. Lendily ID: ${newLoanId}`, 'success');
                requestLoanForm.reset();
                resetLegalConsentState('request');
                borrowerFaceVerified = false;
                stopBorrowerFaceCamera();
                setFaceVerificationStatus('pending', 'Not verified');
                requestBankSource && (requestBankSource.value = 'current');
                setBankSelect('requestBankName', currentUser?.bankName || '');
                document.getElementById('requestAccountNumber').value = currentUser?.accountNumber || '';
                document.getElementById('requestAccountName').value = currentUser?.accountName || currentUser?.name || '';
                syncRequestBankSource();
                document.getElementById('requestFundingType').dispatchEvent(new Event('change'));
                renderRequestSummary();
                renderReferenceHome();
                showPage('dashboard');
            };

            requestLoanForm.addEventListener('submit', handleRequestLoanSubmit);
            requestLoanForm.querySelector('button[type="submit"]')?.addEventListener('click', handleRequestLoanSubmit);
        }
        
        // Accept Loan Form (Borrower)
        const findLoanForm = document.getElementById('find-loan-form');
        const acceptLoanDetailsForm = document.getElementById('accept-loan-details-form');
        const loanSummaryDiv = document.getElementById('loan-summary');
        const reviewAgreementList = document.getElementById('reviewAgreementList');
        const reviewAgreementCount = document.getElementById('reviewAgreementCount');
        const reviewDetailHome = document.getElementById('review-detail-home');
        let foundLoan = null;

        const isLoanForCurrentReviewUser = (loan) => {
            if (!currentUser) return false;
            const pendingParty = getPendingParty(loan);
            const userName = String(currentUser.name || '').toLowerCase();
            const userEmail = String(currentUser.email || '').toLowerCase();
            const userLendilyId = normalizeLendilyId(currentUser.lendilyId || '');
            const userBorrowerId = normalizeBorrowerId(currentUser.borrowerId || '');

            if (pendingParty === 'lender') {
                return String(loan.lender || '').toLowerCase() === userName ||
                    String(loan.lenderEmail || '').toLowerCase() === userEmail ||
                    normalizeLendilyId(loan.lenderLendilyId || '') === userLendilyId;
            }

            return String(loan.borrower || '').toLowerCase() === userName ||
                String(loan.borrowerEmail || '').toLowerCase() === userEmail ||
                normalizeBorrowerId(loan.borrowerId || '') === userBorrowerId;
        };

        const getReviewableAgreements = () => loans.filter(loan =>
            ['pending_borrower_acceptance', 'pending_lender_acceptance'].includes(loan.status) &&
            isLoanForCurrentReviewUser(loan)
        );

        const collapseAgreementReview = () => {
            if (!acceptLoanDetailsForm) return;
            acceptLoanDetailsForm.classList.add('hidden', 'mt-6');
            reviewDetailHome?.appendChild(acceptLoanDetailsForm);
            document.querySelectorAll('.review-agreement-card').forEach(card => {
                card.classList.remove('is-selected');
            });
            foundLoan = null;
        };

        const selectAgreementForReview = (loanId) => {
            if (foundLoan?.id === loanId && !acceptLoanDetailsForm.classList.contains('hidden')) {
                collapseAgreementReview();
                return;
            }
            foundLoan = loans.find(loan => loan.id === loanId);
            if (!foundLoan) return;
            const actionCard = acceptLoanDetailsForm.querySelector('.review-detail-actions');
            actionCard?.remove();
            loanSummaryDiv.innerHTML = renderReviewSummaryCard(foundLoan);
            const decisionSlot = loanSummaryDiv.querySelector('.review-decision-slot');
            if (decisionSlot) {
                if (actionCard) decisionSlot.appendChild(actionCard);
            }
            const selectedCard = reviewAgreementList?.querySelector(`.review-agreement-card[data-loan-id="${loanId}"]`);
            acceptLoanDetailsForm.classList.remove('hidden');
            acceptLoanDetailsForm.classList.remove('mt-6');
            document.querySelectorAll('.review-agreement-card').forEach(card => {
                card.classList.toggle('is-selected', card.dataset.loanId === loanId);
            });
            selectedCard?.appendChild(acceptLoanDetailsForm);
            if (typeof lucide !== 'undefined') lucide.createIcons();
        };

        const renderReviewAgreementInbox = () => {
            if (!reviewAgreementList) return;
            if (acceptLoanDetailsForm && reviewDetailHome && acceptLoanDetailsForm.parentElement !== reviewDetailHome) {
                reviewDetailHome.appendChild(acceptLoanDetailsForm);
                acceptLoanDetailsForm.classList.add('hidden', 'mt-6');
            }
            const agreements = getReviewableAgreements();
            if (reviewAgreementCount) reviewAgreementCount.textContent = String(agreements.length);

            if (!agreements.length) {
                reviewAgreementList.innerHTML = `
                    <div class="review-empty-state">
                        <i data-lucide="inbox" class="w-7 h-7"></i>
                        <strong>No agreements waiting for your review</strong>
                        <span>New agreements sent to you will appear here.</span>
                    </div>
                `;
                acceptLoanDetailsForm?.classList.add('hidden');
                foundLoan = null;
                if (typeof lucide !== 'undefined') lucide.createIcons();
                return;
            }

            reviewAgreementList.innerHTML = agreements.map(loan => {
                const pendingParty = getPendingParty(loan);
                const otherParty = pendingParty === 'lender' ? loan.borrower : loan.lender;
                const charge = loan.fundingType === 'gift' ? 'No repayment' : `${loan.interestRate || 0}% • ${formatCurrency(calculateFundingCharge(loan))}`;
                return `
                    <article class="review-agreement-card ${foundLoan?.id === loan.id ? 'is-selected' : ''}" data-loan-id="${loan.id}">
                        <div class="review-agreement-main">
                            <span>${loan.id}</span>
                            <h3>${getFundingLabel(loan)} from ${otherParty || 'Unknown party'}</h3>
                            <p>${getPurposeLabel(loan.loanPurpose)} • ${formatDate(loan.dueDate)}</p>
                        </div>
                        <div class="review-agreement-side">
                            <strong>${formatCurrency(loan.amount)}</strong>
                            <small>${charge}</small>
                        </div>
                        <div class="review-agreement-actions">
                            <button type="button" class="quick-action-btn review-select-btn" data-review-loan-id="${loan.id}">
                                <i data-lucide="eye" class="w-4 h-4"></i> Review
                            </button>
                        </div>
                    </article>
                `;
            }).join('');

            if (typeof lucide !== 'undefined') lucide.createIcons();
        };

        const resetAcceptLoanPage = () => {
            acceptLoanDetailsForm.classList.add('hidden');
            acceptLoanDetailsForm.classList.add('mt-6');
            reviewDetailHome?.appendChild(acceptLoanDetailsForm);
            acceptLoanDetailsForm.reset();
            foundLoan = null;
            renderReviewAgreementInbox();
        };

        findLoanForm.addEventListener('submit', (e) => {
            e.preventDefault();
            renderReviewAgreementInbox();
        });

        document.getElementById('reject-loan-btn').addEventListener('click', () => {
             if (foundLoan) {
                foundLoan.status = 'rejected';
                showToast(`Agreement ${foundLoan.id} has been rejected.`, 'info');
                resetAcceptLoanPage();
                renderReferenceHome();
                showPage('dashboard');
            }
        });

        reviewAgreementList?.addEventListener('click', (event) => {
            if (event.target.closest('#accept-loan-details-form')) return;
            const reviewButton = event.target.closest('[data-review-loan-id]');
            const card = event.target.closest('.review-agreement-card');
            if (reviewButton) {
                selectAgreementForReview(reviewButton.dataset.reviewLoanId);
                return;
            }
            if (card?.dataset.loanId) {
                selectAgreementForReview(card.dataset.loanId);
            }
        });

        acceptLoanDetailsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!acceptLoanDetailsForm.reportValidity()) return;
            if (!foundLoan) return;
            const receiptDetails = document.getElementById('receipt-details');
            receiptDetails.innerHTML = renderReceiptDocument(foundLoan, {
                statusText: 'Ready to Accept',
                reviewerRows: [
                    { label: 'Name', value: currentUser?.name || 'Current user' },
                    { label: 'Role', value: getPendingParty(foundLoan) === 'lender' ? 'Lender' : 'Borrower' },
                    { label: 'Email', value: maskEmailDisplay(currentUser?.email || '') },
                    { label: 'Phone', value: maskPhoneDisplay(currentUser?.phone || '') }
                ]
            });
            receiptModal.classList.add('active');
        });

        renderReviewAgreementInbox();

        // Consent Form Logic
        const consentCheckbox = document.getElementById('consent-checkbox');
        const finalAcceptBtn = document.getElementById('final-accept-btn');
        consentCheckbox.addEventListener('change', () => {
            finalAcceptBtn.disabled = !consentCheckbox.checked;
        });

        document.getElementById('consent-form').addEventListener('submit', (e) => {
            e.preventDefault();
            if (foundLoan && consentCheckbox.checked) {
                foundLoan.status = 'active';
                showToast(`Agreement ${foundLoan.id} accepted. Funds can now be disbursed.`, 'success');
                
                // Reset forms and modal
                receiptModal.classList.remove('active');
                resetAcceptLoanPage();
                consentCheckbox.checked = false;
                finalAcceptBtn.disabled = true;

                renderReferenceHome();
                showPage('dashboard');
            }
        });


        // --- REFERENCE MOBILE HOME (dynamic primary app landing) ---
        const renderReferenceHome = () => {
            if (!currentUser) return;

            const myLoans = loans.filter(l =>
                (l.lender && l.lender.toLowerCase() === currentUser.name.toLowerCase()) ||
                (l.borrower && l.borrower.toLowerCase() === currentUser.name.toLowerCase())
            );

            // Greeting
            const nameEl = document.getElementById('ref-user-name');
            if (nameEl) nameEl.textContent = currentUser.name || 'User';

            const timeEl = document.getElementById('ref-greeting-time');
            if (timeEl) {
                const hour = new Date().getHours();
                const prefix = hour < 12 ? 'Good morning,' : hour < 17 ? 'Good afternoon,' : 'Good evening,';
                timeEl.textContent = prefix;
            }

            // Wallet calculations
            const settled = ['active', 'repaid'];
            const lentOut = myLoans
                .filter(l => l.lender && l.lender.toLowerCase() === currentUser.name.toLowerCase() && settled.includes(l.status))
                .reduce((s, l) => s + (l.amount || 0), 0);
            const received = myLoans
                .filter(l => l.borrower && l.borrower.toLowerCase() === currentUser.name.toLowerCase() && settled.includes(l.status))
                .reduce((s, l) => s + (l.amount || 0), 0);
            const inEscrow = myLoans
                .filter(l => pendingStatuses.includes(l.status))
                .reduce((s, l) => s + (l.amount || 0), 0);
            const totalProtected = lentOut + received + inEscrow;

            const setMoney = (id, val) => {
                const el = document.getElementById(id);
                if (el) el.textContent = formatCurrency(val);
            };
            setMoney('ref-total-protected', totalProtected);
            setMoney('ref-lent-out', lentOut);
            setMoney('ref-received', received);
            setMoney('ref-in-escrow', inEscrow);

            const trendEl = document.getElementById('ref-trend-pct');
            if (trendEl) {
                const pct = myLoans.length ? Math.min(38, Math.max(4, Math.round((myLoans.length * 3.8)))) : 0;
                trendEl.textContent = `+${pct}%`;
            }

            // Stats
            const activeCount = myLoans.filter(l => l.status === 'active').length;
            const pendingCount = myLoans.filter(l => pendingStatuses.includes(l.status)).length;
            const completedCount = myLoans.filter(l => l.status === 'repaid').length;

            const setNum = (id, val) => {
                const el = document.getElementById(id);
                if (el) el.textContent = val;
            };
            setNum('ref-active-count', activeCount);
            setNum('ref-pending-count', pendingCount);
            setNum('ref-completed-count', completedCount);

            document.querySelectorAll('[data-statement-filter]').forEach(tile => {
                tile.onclick = () => {
                    const filter = tile.getAttribute('data-statement-filter') || 'all';
                    statementFilter = filter;
                    statementSearchQuery = '';
                    history.pushState({pageId: 'dashboard'}, null, '#dashboard');
                    showPage('dashboard');
                    setTimeout(() => {
                        const historyCard = document.querySelector('.dashboard-history-card');
                        historyCard?.setAttribute('open', '');
                        historyCard?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 120);
                };
            });

            // Recent activity (up to 4 most relevant)
            const list = document.getElementById('ref-activity-list');
            if (list) {
                const sorted = [...myLoans].sort((a, b) => {
                    const da = Date.parse(a.dueDate || a.createdAt || 0) || 0;
                    const db = Date.parse(b.dueDate || b.createdAt || 0) || 0;
                    return db - da;
                }).slice(0, 4);

                if (!sorted.length) {
                    list.innerHTML = `<article><span class="reference-icon teal"><i data-lucide="plus-circle"></i></span><div><strong>No activity yet</strong><small>Start a new agreement</small></div><aside><a href="#loan-actions" class="nav-link text-xs font-bold text-teal-600">Create</a></aside></article>`;
                } else {
                    list.innerHTML = sorted.map(loan => {
                        const isLender = loan.lender && loan.lender.toLowerCase() === currentUser.name.toLowerCase();
                        const other = isLender ? (loan.borrower || 'Recipient') : (loan.lender || 'Lender');
                        const short = (other || '').split(' ').slice(0, 2).join(' ');
                        const typeLabel = getFundingLabel(loan);
                        const due = loan.dueDate ? `Due ${formatDate(loan.dueDate).replace(/,?\s*\d{4}$/, '')}` : (loan.fundingType === 'gift' ? 'Gift' : 'No due date');
                        const icon = loan.status === 'active' ? 'arrow-up' : pendingStatuses.includes(loan.status) ? 'clock-3' : 'check-circle-2';
                        const iconClass = loan.status === 'active' ? 'green' : pendingStatuses.includes(loan.status) ? 'amber' : 'teal';
                        const statusSmall = loan.status === 'active' ? 'Active' : pendingStatuses.includes(loan.status) ? 'Pending' : 'Done';
                        return `
                            <article data-loan-id="${loan.id}">
                                <span class="reference-icon ${iconClass}"><i data-lucide="${icon}"></i></span>
                                <div><strong>${isLender ? 'To' : 'From'} ${short}</strong><small>${typeLabel} • ${due}</small></div>
                                <aside><strong>${formatCurrency(loan.amount)}</strong><small>${statusSmall}</small></aside>
                            </article>
                        `;
                    }).join('');
                }
                // Make recent items open the loan in accept or just go to dashboard
                list.querySelectorAll('article[data-loan-id]').forEach(article => {
                    article.style.cursor = 'pointer';
                    article.addEventListener('click', () => {
                        const id = article.getAttribute('data-loan-id');
                        showPage('dashboard');
                        // Optional: could prefilter but dashboard already shows live
                        setTimeout(() => {
                            const el = document.getElementById('statement-search');
                            if (el) { el.value = id; el.dispatchEvent(new Event('input', {bubbles:true})); }
                        }, 120);
                    });
                });
            }

            if (typeof lucide !== 'undefined') lucide.createIcons();
        };

        // --- DASHBOARD LOGIC ---
        const renderDashboard = () => {
            const activeLoansGrid = document.getElementById('active-loans-grid');
            const metricsGrid = document.getElementById('dashboard-metrics');
            if (!activeLoansGrid || !currentUser) return;

            activeLoansGrid.innerHTML = '';
            if (metricsGrid) metricsGrid.innerHTML = '';

            const myLoans = loans.filter(l => l.lender.toLowerCase() === currentUser.name.toLowerCase() || l.borrower.toLowerCase() === currentUser.name.toLowerCase());
            const activeLoans = myLoans.filter(l => l.status === 'active' || pendingStatuses.includes(l.status));
            const totalValue = myLoans.reduce((sum, loan) => sum + getDisplayTotal(loan), 0);
            const pendingCount = myLoans.filter(l => pendingStatuses.includes(l.status)).length;
            const activeCount = myLoans.filter(l => l.status === 'active').length;
            const completedCount = myLoans.filter(l => l.status === 'repaid').length;
            const healthyCount = myLoans.filter(l => l.status === 'active' || l.status === 'repaid').length;
            const healthScore = myLoans.length ? Math.round((healthyCount / myLoans.length) * 100) : 0;
            const settledStatuses = ['active', 'repaid'];
            const sentAmount = myLoans
                .filter(loan => loan.lender.toLowerCase() === currentUser.name.toLowerCase() && settledStatuses.includes(loan.status))
                .reduce((sum, loan) => sum + loan.amount, 0);
            const receivedAmount = myLoans
                .filter(loan => loan.borrower.toLowerCase() === currentUser.name.toLowerCase() && settledStatuses.includes(loan.status))
                .reduce((sum, loan) => sum + loan.amount, 0);
            const pendingIncoming = myLoans
                .filter(loan => loan.borrower.toLowerCase() === currentUser.name.toLowerCase() && pendingStatuses.includes(loan.status))
                .reduce((sum, loan) => sum + loan.amount, 0);
            const walletBalance = Number.isFinite(currentUser.walletBalance)
                ? currentUser.walletBalance
                : Math.max(receivedAmount + pendingIncoming - sentAmount, 0);
            const filterSelect = document.getElementById('live-agreement-filter');
            const sortSelect = document.getElementById('live-agreement-sort');
            if (filterSelect) filterSelect.value = liveAgreementFilter;
            if (sortSelect) sortSelect.value = liveAgreementSort;
            const filteredLiveLoans = activeLoans
                .filter(loan => {
                    if (liveAgreementFilter === 'active') return loan.status === 'active';
                    if (liveAgreementFilter === 'pending') return pendingStatuses.includes(loan.status);
                    if (['loan', 'gift', 'halal'].includes(liveAgreementFilter)) return loan.fundingType === liveAgreementFilter;
                    return true;
                })
                .sort((a, b) => {
                    if (liveAgreementSort === 'amount_desc') return getDisplayTotal(b) - getDisplayTotal(a);
                    if (liveAgreementSort === 'amount_asc') return getDisplayTotal(a) - getDisplayTotal(b);
                    if (liveAgreementSort === 'due_soon') return new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31');
                    if (liveAgreementSort === 'status') return getStatusLabel(a.status).localeCompare(getStatusLabel(b.status));
                    return myLoans.indexOf(a) - myLoans.indexOf(b);
                });

            document.getElementById('dashboard-greeting').textContent = `Welcome back, ${currentUser.name.split(' ')[0]}`;
            setText('dashboard-wallet-balance', formatCurrency(walletBalance));
            setText('dashboard-wallet-sent', formatCurrency(sentAmount));
            setText('dashboard-wallet-received', formatCurrency(receivedAmount));
            document.getElementById('sidebar-user-name') && (document.getElementById('sidebar-user-name').textContent = currentUser.name);
            document.getElementById('sidebar-user-email') && (document.getElementById('sidebar-user-email').textContent = currentUser.email);
            document.getElementById('change-password-username') && (document.getElementById('change-password-username').value = currentUser.email || '');
            const credit = getCreditScoreDetails(myLoans);
            setText('credit-score-value', credit.score);
            setText('credit-score-grade', credit.tier);
            setText('lendily-card-score', credit.score);
            setText('lendily-card-name', currentUser.name || 'Lendily User');
            setText('lender-card-name', currentUser.name || 'Lendily User');
            setText('lendily-card-tier', credit.tier);
            const scoreRing = document.getElementById('credit-score-ring');
            const scoreBar = document.getElementById('credit-score-bar');
            if (scoreRing) scoreRing.style.setProperty('--score-angle', `${Math.round(credit.percent * 3.6)}deg`);
            if (scoreBar) scoreBar.style.width = `${credit.percent}%`;
            const seed = digitsOnly(currentUser.phone || currentUser.lendilyId || '0000').padEnd(12, '0').slice(-12);
            setText('lendily-card-number', `5373 ${seed.slice(0, 4)} ${seed.slice(4, 8)} ${seed.slice(8, 12)}`);
            setText('lender-card-number', `5373 ${seed.slice(8, 12)} ${seed.slice(4, 8)} ${seed.slice(0, 4)}`);

            if (metricsGrid) {
                const metrics = [
                    { label: 'Active', value: activeCount, icon: 'activity', detail: 'Currently running' },
                    { label: 'Pending', value: pendingCount, icon: 'clock-3', detail: 'Awaiting review' },
                    { label: 'Completed', value: completedCount, icon: 'check-circle-2', detail: 'Repaid or fulfilled' },
                    { label: 'Total Records', value: myLoans.length, icon: 'layers-3', detail: 'All agreements' }
                ];
                metrics.forEach(metric => {
                    const card = document.createElement('div');
                    card.className = 'metric-card';
                    card.innerHTML = `
                        <div class="relative z-10">
                            <div>
                                <p class="text-sm font-bold text-slate-500">${metric.label}</p>
                                <p class="text-4xl font-extrabold text-slate-900 mt-2">${metric.value}</p>
                                <p class="text-sm text-slate-500 mt-2">${metric.detail}</p>
                            </div>
                        </div>
                    `;
                    metricsGrid.appendChild(card);
                });
            }

            renderTransactionHistory(myLoans);
            renderDashboardCharts(myLoans);

            if (filteredLiveLoans.length === 0) {
                activeLoansGrid.innerHTML = `<p class="text-slate-500 col-span-full">No live agreements match this view. <a href="#loan-actions" class="nav-link font-semibold text-blue-500">Create one?</a></p>`;
            } else {
                filteredLiveLoans.forEach(loan => {
                    const card = document.createElement('div');
                    card.className = 'agreement-card live-agreement-card bg-white rounded-xl shadow-lg transform hover:-translate-y-1 transition-transform duration-300';
                    const isLender = loan.lender.toLowerCase() === currentUser.name.toLowerCase();
                    const otherParty = isLender ? loan.borrower : loan.lender;
                    const displayParty = getFirstLastName(otherParty);
                    const role = isLender ? 'Borrower' : 'Lender';
                    const statusIcon = loan.status === 'active' ? 'activity' : 'clock-3';
                    let statusBadge;
                    if(loan.status === 'active') {
                        statusBadge = `<span class="live-status-pill active"><i data-lucide="${statusIcon}" class="w-3.5 h-3.5"></i>Active</span>`;
                    } else {
                        const pendingLabel = loan.status === 'pending_lender_acceptance' ? 'Pending Lender' : 'Pending Borrower';
                        statusBadge = `<span class="live-status-pill pending"><i data-lucide="${statusIcon}" class="w-3.5 h-3.5"></i>${pendingLabel}</span>`;
                    }
                    const progressWidth = loan.status === 'active' ? '72' : '34';
                    const chargeLabel = loan.fundingType === 'gift' ? 'Gift' : loan.fundingType === 'halal' ? 'Profit' : 'Interest';
                    const chargeValue = loan.fundingType === 'gift' ? 'No repayment' : formatCurrency(getTotalProfit(loan));
                    const totalLabel = loan.fundingType === 'gift' ? 'Recorded' : 'Total due';
                    const progressLabel = loan.status === 'active' ? 'In repayment' : 'Awaiting review';
                    const actionButtons = [
                        `<button class="share-agreement-btn live-action-btn share" data-loan-id="${loan.id}"><i data-lucide="send" class="w-4 h-4"></i>Share</button>`,
                        pendingStatuses.includes(loan.status) ? `<button class="review-agreement-btn live-action-btn review" data-loan-id="${loan.id}"><i data-lucide="file-check-2" class="w-4 h-4"></i>Review</button>` : '',
                        isLender && loan.status === 'active' ? `<button class="enforce-btn live-action-btn danger" data-loan-id="${loan.id}"><i data-lucide="shield-alert" class="w-4 h-4"></i>Enforce</button>` : '',
                        isLender && loan.status === 'active' && loan.fundingType !== 'gift' ? `<button class="forfeit-btn live-action-btn warning" data-loan-id="${loan.id}"><i data-lucide="badge-x" class="w-4 h-4"></i>Forfeit</button>` : '',
                        isLender && loan.status === 'active' ? `<button class="reminder-btn live-action-btn neutral" data-loan-id="${loan.id}"><i data-lucide="bell-ring" class="w-4 h-4"></i>Reminder</button>` : ''
                    ].filter(Boolean).join('');

                    card.innerHTML = `
                        <div class="live-agreement-top">
                            <div class="live-party-block">
                                <div class="live-party-mark"><i data-lucide="${isLender ? 'user-round' : 'landmark'}" class="w-5 h-5"></i></div>
                                <div>
                                    <h3 title="${otherParty}">${displayParty}</h3>
                                    <p>${role} • ${getFundingLabel(loan)}</p>
                                </div>
                            </div>
                            ${statusBadge}
                        </div>
                        <div class="live-money-panel">
                            <div>
                                <span>Principal</span>
                                <strong>${formatCurrency(loan.amount)}</strong>
                            </div>
                            <div>
                                <span>${totalLabel}</span>
                                <strong>${formatCurrency(getDisplayTotal(loan))}</strong>
                            </div>
                        </div>
                        <div class="live-detail-grid">
                            <div><span>Purpose</span><strong>${getPurposeLabel(loan.loanPurpose)}</strong></div>
                            <div><span>${chargeLabel}</span><strong>${chargeValue}</strong></div>
                            <div><span>Due date</span><strong>${formatDate(loan.dueDate)}</strong></div>
                            <div><span>Agreement</span><strong>${loan.id}</strong></div>
                        </div>
                        <div class="live-progress-block">
                            <div>
                                <span>${loan.id}</span>
                                <span>${progressLabel}</span>
                            </div>
                            <div class="progress-rail"><div class="progress-fill" style="width: ${progressWidth}%"></div></div>
                        </div>
                        <div class="live-card-actions">
                            ${actionButtons}
                        </div>
                    `;
                    activeLoansGrid.appendChild(card);
                });
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }



            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        };
        
        const getLiveActionLoan = (loanId) => loans.find(item => item.id === loanId);
        const refreshLiveAgreementSurfaces = () => {
            renderDashboard();
            renderReferenceHome();
        };

        window.triggerEnforcement = (loanId) => {
            const loan = getLiveActionLoan(loanId);
            if (!loan) return showToast('Agreement not found.', 'error');
            openLiveActionModal({
                tone: 'danger',
                eyebrow: 'Recovery warning',
                title: `Enforce ${loan.id}`,
                icon: 'shield-alert',
                confirmLabel: 'I Understand, Enforce',
                consentCopy: 'I understand Lendily cannot guarantee recovery and I still want to request enforcement.',
                body: `
                    <div class="live-action-summary">
                        <span>${getFundingLabel(loan)}</span>
                        <strong>${formatCurrency(getDisplayTotal(loan))}</strong>
                        <small>${loan.borrower || 'Borrower'} • Due ${formatDate(loan.dueDate)}</small>
                    </div>
                    <p>Enforcement can strain or damage the relationship between you and the borrower. Use it only when you are ready for that consequence.</p>
                    <p>By continuing, you ask Lendily to begin the recovery mandate you accepted before disbursement, including authorization workflows intended to debit repayment from available borrower-linked accounts where legally and technically possible.</p>
                    <ul>
                        <li>Recovery is not guaranteed. It may fail because of no funds, death, network or banking issues, the borrower no longer using banking services, regulatory limits, or an act of God.</li>
                        <li>Lendily will try its best within the agreed terms, but this action does not guarantee that you will get your money back.</li>
                        <li>You acknowledge that the prior agreement releases Lendily from liability for failed recovery attempts.</li>
                    </ul>
                `,
                onConfirm: () => {
                    loan.enforcementRequestedAt = new Date().toISOString();
                    loan.enforcementRequestedBy = currentUser?.name || 'Lender';
                    showTransientErrorModal(
                        `Enforcement request recorded for ${loan.id}. Lendily will begin the agreed recovery workflow.`,
                        'Enforcement requested',
                        { type: 'info', duration: 3600 }
                    );
                    showToast(`Enforcement request recorded for ${loan.borrower || 'the borrower'}.`, 'error');
                    refreshLiveAgreementSurfaces();
                }
            });
        };

        window.forfeitAgreement = (loanId) => {
            const loan = getLiveActionLoan(loanId);
            if (!loan) return showToast('Agreement not found.', 'error');
            openLiveActionModal({
                tone: 'warning',
                eyebrow: 'Irreversible release',
                title: `Forfeit ${loan.id}`,
                icon: 'badge-x',
                confirmLabel: 'Agree & Start Face Check',
                consentCopy: 'I understand this releases the borrower and cannot be reversed.',
                body: `
                    <div class="live-action-summary">
                        <span>Release borrower from repayment</span>
                        <strong>${formatCurrency(getDisplayTotal(loan))}</strong>
                        <small>${loan.borrower || 'Borrower'} • ${getFundingLabel(loan)}</small>
                    </div>
                    <p>Forfeiting this agreement means you voluntarily release the borrower from the repayment obligation recorded on Lendily.</p>
                    <p>This decision is final. After the forfeiture is confirmed, there is no going back from this action inside Lendily.</p>
                    <p>To protect both sides, Lendily will require facial liveness proof after you accept this agreement before the loan is marked as forfeited.</p>
                `,
                onConfirm: async () => {
                    const face = window.lendilyFaceVerification;
                    if (!face?.open || !face?.verify) {
                        showTransientErrorModal('Face verification is unavailable right now. Try again from the request page or reload Lendily.', 'Liveness required');
                        return;
                    }
                    face.open({
                        title: 'Forfeit Proof',
                        cardTitle: 'Lender Liveness Check',
                        cardCopy: 'Confirm the lender is personally releasing this borrower from repayment.',
                        hint: 'Forfeit requires proof. Center your face, turn left, turn right, and smile.'
                    });
                    await new Promise(resolve => requestAnimationFrame(resolve));
                    const verified = await face.verify();
                    if (!verified) {
                        showTransientErrorModal('Forfeit was not completed because liveness proof failed or was cancelled.', 'Forfeit not completed');
                        return;
                    }
                    loan.status = 'forfeited';
                    loan.forfeitedAt = new Date().toISOString();
                    loan.forfeitedBy = currentUser?.name || 'Lender';
                    loan.forfeitFaceVerifiedAt = currentUser?.faceVerifiedAt || new Date().toISOString();
                    showTransientErrorModal(
                        `${loan.id} has been forfeited. ${loan.borrower || 'The borrower'} is released from repayment.`,
                        'Borrower released',
                        { type: 'info', duration: 3800 }
                    );
                    showToast(`Agreement ${loan.id} forfeited. Borrower released from repayment.`, 'success');
                    refreshLiveAgreementSurfaces();
                }
            });
        };

        window.sendReminder = (loanId) => {
            const loan = getLiveActionLoan(loanId);
            if (!loan) return showToast('Agreement not found.', 'error');
            const borrowerName = loan.borrower || 'Borrower';
            const borrowerPhone = loan.borrowerPhone || borrowerDirectory[loan.borrowerId]?.phone;
            const whatsappPhone = normalizeWhatsAppPhone(borrowerPhone);
            const message = [
                `Hello ${borrowerName},`,
                `${currentUser?.name || 'Your lender'} is reminding you about your Lendily ${getFundingLabel(loan).toLowerCase()} agreement.`,
                `Agreement ID: ${loan.id}`,
                `Amount due: ${formatCurrency(getDisplayTotal(loan))}`,
                `Due date: ${formatDate(loan.dueDate)}`,
                `Please review and make repayment as agreed.`
            ].join('\n');
            if (whatsappPhone) {
                window.open(`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
            }
            showToast(whatsappPhone ? `Reminder prepared for ${borrowerName}.` : `Reminder noted for ${borrowerName}. Add a phone number to send by WhatsApp.`, 'info');
        };
        const shareAgreementOnWhatsApp = (loanId) => {
            const loan = loans.find(item => item.id === loanId);
            if (!loan || !currentUser) return;
            const isLender = loan.lender.toLowerCase() === currentUser.name.toLowerCase();
            const recipientName = isLender ? loan.borrower : loan.lender;
            const recipientPhone = isLender
                ? (loan.borrowerPhone || borrowerDirectory[loan.borrowerId]?.phone)
                : loan.lenderPhone;
            const whatsappPhone = normalizeWhatsAppPhone(recipientPhone);
            const agreementUrl = `${window.location.origin}${window.location.pathname}#accept-loan`;
            const verb = isLender ? 'sent you' : 'requested';
            const message = [
                `Hello ${recipientName},`,
                `${currentUser.name} ${verb} a Lendily ${getFundingLabel(loan).toLowerCase()} agreement for ${formatCurrency(getDisplayTotal(loan))}.`,
                `Agreement ID: ${loan.id}`,
                `Status: ${getStatusLabel(loan.status)}`,
                `Review it here: ${agreementUrl}`
            ].join('\n');
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = whatsappPhone
                ? `https://wa.me/${whatsappPhone}?text=${encodedMessage}`
                : `https://api.whatsapp.com/send?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            showToast(whatsappPhone ? `Opening WhatsApp for ${recipientName}.` : 'Opening WhatsApp share. Add the recipient before sending.', 'success');
        };
        const openTransactionReceipt = (loanId) => {
            const loan = loans.find(item => item.id === loanId);
            if (!loan) return showToast('Receipt not found.', 'error');
            const receiptDetails = document.getElementById('receipt-details');
            receiptDetails.innerHTML = renderReceiptDocument(loan, {
                statusText: getStatusLabel(loan.status),
                reviewerRows: [
                    { label: 'Disbursed date', value: formatDate(getDisbursedDate(loan)) },
                    { label: 'Reimbursed date', value: formatDate(getReimbursedDate(loan)) }
                ]
            });
            receiptModal.classList.add('active');
        };

        let chartResizeTimer = null;
        window.addEventListener('resize', () => {
            if (!loggedIn || !document.getElementById('dashboard')?.classList.contains('active')) return;
            clearTimeout(chartResizeTimer);
            chartResizeTimer = setTimeout(renderDashboard, 150);
        });

        document.getElementById('live-agreement-filter')?.addEventListener('change', (event) => {
            liveAgreementFilter = event.target.value;
            renderDashboard();
        });

        document.getElementById('live-agreement-sort')?.addEventListener('change', (event) => {
            liveAgreementSort = event.target.value;
            renderDashboard();
        });

        const updateStatementSearch = () => {
            statementSearchQuery = document.getElementById('statement-search')?.value.trim() || '';
            renderDashboard();
        };

        document.getElementById('statement-search')?.addEventListener('input', (event) => {
            statementSearchQuery = event.target.value.trim();
            renderDashboard();
        });

        document.getElementById('statement-search')?.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter') return;
            event.preventDefault();
            updateStatementSearch();
        });

        document.getElementById('statement-search-btn')?.addEventListener('click', updateStatementSearch);

        document.getElementById('statement-filter')?.addEventListener('change', (event) => {
            statementFilter = event.target.value;
            renderDashboard();
        });

        document.getElementById('statement-sort')?.addEventListener('change', (event) => {
            statementSort = event.target.value;
            renderDashboard();
        });

        const resetInteractiveCard = (card) => {
            card.style.setProperty('--rx', '0deg');
            card.style.setProperty('--ry', '0deg');
            card.style.setProperty('--mx', '50%');
            card.style.setProperty('--my', '18%');
        };

        document.addEventListener('pointermove', (event) => {
            const card = event.target.closest('.interactive-lendily-card');
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            const rotateY = (x - 0.5) * 10;
            const rotateX = (0.5 - y) * 8;
            card.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
            card.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
            card.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
            card.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
        });

        document.addEventListener('pointerleave', (event) => {
            const card = event.target.closest?.('.interactive-lendily-card');
            if (card) resetInteractiveCard(card);
        }, true);

        document.addEventListener('click', (e) => {
            const reminderBtn = e.target.closest('.reminder-btn');
            if (reminderBtn) sendReminder(reminderBtn.dataset.loanId);

            const enforceBtn = e.target.closest('.enforce-btn');
            if (enforceBtn) triggerEnforcement(enforceBtn.dataset.loanId);

            const forfeitBtn = e.target.closest('.forfeit-btn');
            if (forfeitBtn) forfeitAgreement(forfeitBtn.dataset.loanId);

            const shareBtn = e.target.closest('.share-agreement-btn');
            if (shareBtn) shareAgreementOnWhatsApp(shareBtn.dataset.loanId);

            const reviewBtn = e.target.closest('.review-agreement-btn');
            if (reviewBtn) {
                showPage('accept-loan');
                selectAgreementForReview(reviewBtn.dataset.loanId);
                showToast(`Loaded ${reviewBtn.dataset.loanId} for review.`, 'info');
            }

            const receiptBtn = e.target.closest('.view-receipt-btn');
            if (receiptBtn) openTransactionReceipt(receiptBtn.dataset.loanId);

            const refreshBtn = e.target.closest('#refresh-dashboard-btn');
            if (refreshBtn) {
                renderDashboard();
                showToast('Dashboard refreshed.', 'success');
            }
        });

        // --- GENERAL INITIALIZATION ---
        const refreshIcons = () => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
                return;
            }
            const fallbackIcons = {
                'activity': '↗', 'arrow-left': '←', 'arrow-right': '→', 'badge-check': '✓',
                'bell-ring': '!', 'calendar': '◷', 'calendar-clock': '◷', 'chart-line': '↗',
                'check': '✓', 'check-circle': '✓', 'check-circle-2': '✓', 'check-square': '☑',
                'chevron-left': '‹', 'chevron-right': '›', 'clock-3': '◷',
                'download': '↓', 'file-check-2': '✓', 'file-pen-line': '✎',
                'file-plus-2': '+', 'gift': '◆', 'hand-coins': '₦', 'handshake': '✓',
                'home': '⌂', 'info': 'i', 'landmark': '▦', 'layers-3': '▤',
                'layout-dashboard': '▦', 'lock': '⌕', 'log-out': '↪',
                'mail': '@', 'map-pin': '•', 'menu': '☰', 'message-circle': '◌',
                'phone': '☎', 'plus-circle': '+', 'receipt': '▤', 'receipt-text': '▤',
                'refresh-cw': '↻', 'repeat-2': '↻', 'scan-face': '◉', 'search': '⌕',
                'search-check': '✓', 'send': '➤', 'shield-alert': '!', 'shield-check': '✓',
                'sparkles': '✦', 'user-circle': '◉', 'user-round': '◉', 'wifi': '⌁',
                'user-round-check': '✓', 'x': '×', 'x-circle': '×'
            };
            document.querySelectorAll('[data-lucide]').forEach(icon => {
                const iconName = icon.getAttribute('data-lucide');
                icon.textContent = fallbackIcons[iconName] || '•';
                icon.classList.add('icon-fallback');
                icon.setAttribute('aria-hidden', 'true');
            });
        };

        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('current-year').textContent = new Date().getFullYear();
            registerPwa();
            updateAuthUI();
            setupLanguageControls();
            setupModals();
            loadNigeriaStatesAndLgas();
            loadNigerianBanks();
            startHeroSlides();
            startSocialProofFeed();
            const initialPage = window.location.hash.substring(1) || 'home';
            showPage(document.getElementById(initialPage) ? initialPage : 'home');
            // Ensure the mobile reference home is populated even on first paint
            if (initialPage === 'home' || !document.getElementById('dashboard')?.classList.contains('active')) {
                renderReferenceHome();
            }
            refreshIcons();
            window.setTimeout(refreshIcons, 250);
        });
