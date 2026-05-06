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
                'form.profitExpected': 'Profit Expected (NGN)',
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
                'form.profitExpected': 'Ribar da ake so (NGN)',
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
                'form.profitExpected': 'Uru a tụrụ anya (NGN)',
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
                'form.profitExpected': 'Ere Ti A Nreti (NGN)',
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
            window.addEventListener('beforeinstallprompt', (event) => {
                event.preventDefault();
                deferredInstallPrompt = event;
                installButton?.classList.remove('hidden');
            });

            installButton?.addEventListener('click', async () => {
                if (!deferredInstallPrompt) {
                    showToast('Install is available when Lendily is opened from localhost or HTTPS.', 'info');
                    return;
                }

                deferredInstallPrompt.prompt();
                await deferredInstallPrompt.userChoice;
                deferredInstallPrompt = null;
                installButton.classList.add('hidden');
            });

            window.addEventListener('appinstalled', () => {
                deferredInstallPrompt = null;
                installButton?.classList.add('hidden');
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
            return getUserQrUrl(user);
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
            gradient.addColorStop(0.48, '#143b3b');
            gradient.addColorStop(1, '#4f46e5');
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

            const qrImage = await loadImageElement(await getUserQrDataUrl(currentUser, 360));
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

            const link = document.createElement('a');
            link.download = `${(currentUser.lendilyId || 'lendily').toLowerCase()}-qr-card.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            showToast('QR card downloaded.', 'success');
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
                { key: 'name', label: 'Full name' },
                { key: 'phone', label: 'Phone number' }
            ];
            const borrowerFields = [
                { key: 'name', label: 'Full name' },
                { key: 'phone', label: 'Phone number' },
                { key: 'dateOfBirth', label: 'Date of Birth' },
                { key: 'residentialAddress', label: 'Residential Address' },
                { key: 'state', label: 'State' },
                { key: 'lga', label: 'LGA' },
                { key: 'nin', label: 'NIN' },
                { key: 'bvn', label: 'BVN' },
                { key: 'idNumber', label: 'ID Number' },
                { key: 'bankName', label: 'Bank Name' },
                { key: 'accountNumber', label: 'Account Number' },
                { key: 'accountName', label: 'Account Name' },
                { key: 'idUploaded', label: 'ID Uploaded' },
                { key: 'passportUploaded', label: 'Passport Photo Uploaded' }
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

        const chartPalette = ['#00b8a9', '#6457ff', '#ff8a4c', '#22c55e', '#f59e0b', '#ef4444', '#64748b'];

        const prepareCanvas = (canvas) => {
            if (!canvas) return null;
            const rect = canvas.getBoundingClientRect();
            const ratio = window.devicePixelRatio || 1;
            const width = Math.max(rect.width, 280);
            const height = Math.max(rect.height, 180);
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
                <span><i class="legend-dot" style="background:${item.color || chartPalette[index % chartPalette.length]}"></i>${item.label}: ${item.value}</span>
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
            const radius = Math.min(width, height) * 0.36;
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
            ctx.font = '800 24px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(String(total), centerX, centerY - 2);
            ctx.fillStyle = '#64748b';
            ctx.font = '700 12px Inter, sans-serif';
            ctx.fillText('records', centerX, centerY + 18);

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

            const statusItems = ['active', 'pending_borrower_acceptance', 'pending_lender_acceptance', 'repaid', 'defaulted'].map((status, index) => ({
                label: getStatusLabel(status),
                value: myLoans.filter(loan => loan.status === status).length,
                color: chartPalette[index]
            }));

            renderDoughnutChart('funding-mix-chart', 'funding-mix-legend', fundingItems);
            renderDoughnutChart('status-split-chart', 'status-split-legend', statusItems);
        };

        const renderTransactionHistory = (myLoans) => {
            const body = document.getElementById('transaction-history-body');
            if (!body) return;
            const searchInput = document.getElementById('statement-search');
            const filterSelect = document.getElementById('statement-filter');
            const sortSelect = document.getElementById('statement-sort');
            if (searchInput && searchInput.value !== statementSearchQuery) searchInput.value = statementSearchQuery;
            if (filterSelect) filterSelect.value = statementFilter;
            if (sortSelect) sortSelect.value = statementSort;

            if (!myLoans.length) {
                setText('history-count', '0 records');
                body.innerHTML = '<tr><td colspan="11" class="text-slate-500">No transaction history yet.</td></tr>';
                return;
            }

            const normalizedSearch = statementSearchQuery.trim().toLowerCase();
            const getDateTime = (value, fallback) => {
                const parsed = Date.parse(value);
                return Number.isNaN(parsed) ? fallback : parsed;
            };
            const rows = myLoans
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

            const filteredLabel = rows.length === myLoans.length ? `${rows.length}` : `${rows.length} of ${myLoans.length}`;
            setText('history-count', `${filteredLabel} ${rows.length === 1 ? 'record' : 'records'}`);
            if (!rows.length) {
                body.innerHTML = '<tr><td colspan="11" class="text-slate-500">No statement records match your search.</td></tr>';
                return;
            }

            body.innerHTML = rows.map(({ loan, index }) => {
                const isLender = loan.lender.toLowerCase() === currentUser.name.toLowerCase();
                const otherParty = isLender ? loan.borrower : loan.lender;
                return `
                    <tr>
                        <td><span class="font-bold text-slate-800">${otherParty}</span><br><span class="text-xs text-slate-400">${loan.id}</span></td>
                        <td>${getFundingLabel(loan)}</td>
                        <td class="font-bold text-slate-900">${formatCurrency(getDisplayTotal(loan))}</td>
                        <td>${getInterestDisplay(loan)}</td>
                        <td class="font-bold text-slate-900">${formatCurrency(getTotalProfit(loan))}</td>
                        <td><span class="text-xs font-bold px-2 py-1 rounded-full ${getStatusColor(loan.status)}">${getStatusLabel(loan.status)}</span></td>
                        <td>${formatDate(getTransactionDate(loan, index))}</td>
                        <td>${formatDate(getRepaymentDate(loan))}</td>
                        <td>${formatDate(getDisbursedDate(loan))}</td>
                        <td>${formatDate(getReimbursedDate(loan))}</td>
                        <td><button type="button" class="view-receipt-btn quick-action-btn text-xs font-bold px-3 py-2 text-slate-800" data-loan-id="${loan.id}">View Receipt</button></td>
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
            const chargeLabel = isHalal ? 'Markup' : 'Interest';
            const chargeValue = isGift ? 'Not applicable' : `${Number.isFinite(draft.interestRate) ? draft.interestRate : 0}%`;
            const profitLabel = isHalal ? 'Markup Amount' : 'Interest Amount';
            const chargeAmount = calculateFundingCharge(draft);
            const periodValue = isGift ? 'Not applicable' : (draft.interestPeriod || 'period').replace(/_/g, ' ');
            const totalValue = isGift ? 'No repayment' : formatCurrency(calculateTotalRepayment(draft));
            const durationValue = getAgreementDurationLabel(draft.dueDate);
            const repaymentPlan = isGift ? 'No repayment expected' : (draft.repaymentPlan || 'end_of_term').replace(/_/g, ' ');
            const dueDateValue = formatDate(draft.dueDate);
            const dueDateClass = dueDateValue === 'Not applicable' ? ' class="is-muted"' : '';

            summary.innerHTML = `
                <div class="offer-preview-hero">
                    <div class="flex items-start justify-between gap-4">
                        <div>
                            <p class="text-xs font-bold uppercase tracking-[0.16em] text-white/60">Transaction Summary</p>
                            <h3 class="text-2xl font-black mt-2">${formatCurrency(draft.amount)}</h3>
                            <p class="text-sm text-white/70 mt-1">${draft.borrower} requesting from ${draft.lender}</p>
                        </div>
                        <span class="offer-preview-chip">
                            <i data-lucide="${isGift ? 'gift' : isHalal ? 'landmark' : 'hand-coins'}" class="w-3.5 h-3.5"></i>
                            ${getFundingLabel(draft)}
                        </span>
                    </div>
                    <div class="grid sm:grid-cols-3 gap-3 mt-5">
                        <div>
                            <p class="text-xs text-white/55 font-bold uppercase tracking-wide">Total To Pay</p>
                            <p class="text-xl font-black mt-1">${totalValue}</p>
                        </div>
                        <div>
                            <p class="text-xs text-white/55 font-bold uppercase tracking-wide">${profitLabel}</p>
                            <p class="text-xl font-black mt-1">${isGift ? 'No profit' : formatCurrency(chargeAmount)}</p>
                        </div>
                        <div>
                            <p class="text-xs text-white/55 font-bold uppercase tracking-wide">Time</p>
                            <p class="text-xl font-black mt-1">${durationValue}</p>
                        </div>
                    </div>
                </div>
                <dl class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                    <div class="offer-preview-stat"><dt>${chargeLabel}</dt><dd>${chargeValue}</dd></div>
                    <div class="offer-preview-stat"><dt>Period</dt><dd>${periodValue}</dd></div>
                    <div class="offer-preview-stat"><dt>Purpose</dt><dd>${getPurposeLabel(draft.loanPurpose)}</dd></div>
                    <div class="offer-preview-stat"><dt>Plan</dt><dd>${repaymentPlan}</dd></div>
                    <div class="offer-preview-stat"><dt>Due Date</dt><dd${dueDateClass}>${dueDateValue}</dd></div>
                </dl>
                <div class="offer-preview-timeline mt-4">
                    <span><i data-lucide="user-round-check" class="w-4 h-4 text-blue-500"></i> Borrower: <strong class="text-slate-900">${draft.borrower}</strong></span>
                    <span><i data-lucide="receipt-text" class="w-4 h-4 text-teal-500"></i> The lender sees these terms before approving the request.</span>
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

            preview.innerHTML = `
                <div class="offer-preview-hero">
                    <div class="flex items-start justify-between gap-4">
                        <div>
                            <p class="text-xs font-bold uppercase tracking-[0.16em] text-white/60">Offer Preview</p>
                            <h3 class="text-2xl font-black mt-2">${formatCurrency(draft.amount)}</h3>
                            <p class="text-sm text-white/70 mt-1">${draft.lender} to ${draft.borrower}</p>
                        </div>
                        <span class="offer-preview-chip">
                            <i data-lucide="${isGift ? 'gift' : isHalal ? 'landmark' : 'hand-coins'}" class="w-3.5 h-3.5"></i>
                            ${getFundingLabel(draft)}
                        </span>
                    </div>
                    <div class="grid sm:grid-cols-3 gap-3 mt-5">
                        <div>
                            <p class="text-xs text-white/55 font-bold uppercase tracking-wide">${chargeLabel}</p>
                            <p class="text-xl font-black mt-1">${profitDisplay}</p>
                        </div>
                        <div>
                            <p class="text-xs text-white/55 font-bold uppercase tracking-wide">Total To Receive</p>
                            <p class="text-xl font-black mt-1">${totalDisplay}</p>
                        </div>
                        <div>
                            <p class="text-xs text-white/55 font-bold uppercase tracking-wide">Time</p>
                            <p class="text-xl font-black mt-1">${durationValue}</p>
                        </div>
                    </div>
                </div>
                <dl class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                    <div class="offer-preview-stat"><dt>${rateLabel}</dt><dd>${rateDisplay}</dd></div>
                    <div class="offer-preview-stat"><dt>Period</dt><dd>${periodValue}</dd></div>
                    <div class="offer-preview-stat"><dt>Purpose</dt><dd>${getPurposeLabel(draft.loanPurpose)}</dd></div>
                    <div class="offer-preview-stat"><dt>Plan</dt><dd>${repaymentPlan}</dd></div>
                </dl>
                <div class="offer-preview-timeline mt-4">
                    <span><i data-lucide="calendar-clock" class="w-4 h-4 text-blue-500"></i> Due date: <strong class="text-slate-900">${formatDate(draft.dueDate)}</strong></span>
                    <span><i data-lucide="receipt-text" class="w-4 h-4 text-teal-500"></i> The borrower sees these terms before accepting the offer.</span>
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
            if (checkbox) checkbox.checked = false;
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
            if (checkbox) checkbox.checked = true;
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
                    <button class="login-btn text-slate-600 hover:text-blue-500 font-semibold">${t('auth.login')}</button>
                    <button class="register-btn gradient-btn text-white font-semibold py-2 px-6 rounded-full">Sign Up</button>
                `;
                mobileLinksHtml = `
                    <button class="login-btn block w-full text-left py-3 text-slate-600 hover:text-blue-500 font-semibold">${t('auth.login')}</button>
                    <button class="register-btn gradient-btn text-white font-semibold py-2 px-6 rounded-full mt-2">Sign Up</button>
                `;
            }
            authLinksContainer.innerHTML = linksHtml;
            mobileAuthLinksContainer.innerHTML = mobileLinksHtml;

            // Add event listeners to newly created buttons
            if (loggedIn) {
                document.querySelectorAll('.logout-btn').forEach(button => button.addEventListener('click', handleLogout));
                document.getElementById('logout-btn-sidebar')?.addEventListener('click', handleLogout);
                document.getElementById('logout-btn-profile')?.addEventListener('click', handleLogout);
            } else {
                document.querySelectorAll('.login-btn').forEach(button => button.addEventListener('click', () => loginModal.classList.add('active')));
                document.querySelectorAll('.register-btn').forEach(button => button.addEventListener('click', () => registerModal.classList.add('active')));
            }
        };

        const handleLogout = () => {
            loggedIn = false;
            currentUser = null;
            updateAuthUI();
            showPage('home');
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
            [loginModal, registerModal, receiptModal, requestLegalModal, qrScanModal].forEach(modal => {
                modal?.addEventListener('click', (e) => {
                    if (e.target !== modal) return;
                    modal.classList.remove('active');
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

            document.getElementById('login-form').addEventListener('submit', (e) => {
                e.preventDefault();
                const loginPhone = document.getElementById('login-phone');
                const loginEmail = document.getElementById('login-email');
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
                loginModal.classList.remove('active');
                showToast('Login successful!', 'success');
                showPage('dashboard');
            });

            document.getElementById('register-form').addEventListener('submit', (e) => {
                e.preventDefault();
                const registerName = document.getElementById('register-name');
                const registerPhone = document.getElementById('register-phone');
                const registerEmail = document.getElementById('register-email');
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
                registerModal.classList.remove('active');
                showToast('Registration successful. Your Lendily QR is ready in your profile.', 'success');
                showPage('profile');
            });
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

            setText('lender-completeness-percent', `${lenderCompleteness.percent}%`);
            setText('borrower-completeness-percent', `${borrowerCompleteness.percent}%`);
            setText('lender-completeness-copy', currentLanguage === 'en'
                ? `${lenderCompleteness.completedCount} of ${lenderCompleteness.totalCount} lender fields are complete.`
                : `${lenderCompleteness.completedCount} / ${lenderCompleteness.totalCount} ${translatePhrase('Lender Profile')}.`);
            setText('borrower-completeness-copy', currentLanguage === 'en'
                ? `${borrowerCompleteness.completedCount} of ${borrowerCompleteness.totalCount} borrower fields are complete.`
                : `${borrowerCompleteness.completedCount} / ${borrowerCompleteness.totalCount} ${translatePhrase('Borrower Profile')}.`);

            const lenderBar = document.getElementById('lender-completeness-bar');
            const borrowerBar = document.getElementById('borrower-completeness-bar');
            if (lenderBar) lenderBar.style.width = `${lenderCompleteness.percent}%`;
            if (borrowerBar) borrowerBar.style.width = `${borrowerCompleteness.percent}%`;

            const renderChecklist = (listId, completeness) => {
                const list = document.getElementById(listId);
                if (!list) return;
                list.innerHTML = completeness.items.map(item => `
                    <div class="profile-check-item">
                        <span class="profile-check-label">${translatePhrase(item.label)}</span>
                        <span class="profile-check-status ${item.complete ? 'is-done' : 'is-missing'}">
                            <i data-lucide="${item.complete ? 'check' : 'clock-3'}" class="w-3 h-3"></i>${item.complete ? translatePhrase('Done') : translatePhrase('Missing')}
                        </span>
                    </div>
                `).join('');
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

        const showPage = (pageId) => {
            if (protectedPages.includes(pageId) && !loggedIn) {
                continueAsDemoUser();
                showToast('Opened Lendily in demo mode.', 'info');
            }

            document.body.classList.toggle('dashboard-page', pageId === 'dashboard');
            pages.forEach(page => page.classList.toggle('active', page.id === pageId));
            if (pageId !== 'request-loan') {
                const faceVideo = document.getElementById('borrowerFaceVideo');
                faceVideo?.srcObject?.getTracks().forEach(track => track.stop());
                if (faceVideo) faceVideo.srcObject = null;
            }
            window.scrollTo(0, 0);
            
            if (pageId === 'dashboard' && loggedIn) renderDashboard();
            if (pageId === 'profile' && loggedIn) renderProfile();
            if (pageId === 'request-loan' && loggedIn) {
                renderRequestSummary();
                renderRequestProfileGate();
            }
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
                mobileMenu?.classList.add('hidden');
            }
        });
        
        window.addEventListener('popstate', (e) => {
            const pageId = (e.state && e.state.pageId) ? e.state.pageId : 'home';
            showPage(pageId);
        });

        // --- COMPONENT LOGIC ---

        // Mobile Menu
        mobileMenuBtn?.addEventListener('click', () => mobileMenu?.classList.toggle('hidden'));

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

            ['loanAmount', 'interestRate', 'profitExpected', 'requestAmount', 'requestInterestRate', 'requestProfitExpected', 'counterAmount', 'counterInterestRate'].forEach(id => {
                const input = document.getElementById(id);
                input?.addEventListener('input', () => input.classList.remove('border-red-500'));
            });

            ['loanAmount', 'profitExpected', 'requestAmount', 'requestProfitExpected', 'counterAmount'].forEach(id => {
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
            accountName.value = cleanText(accountName.value);
            if (accountNumber.value.length !== 10) return showFieldError(accountNumber, 'Account number must contain exactly 10 digits.');
            if (!accountName.value) return showFieldError(accountName, 'Account name is required.');
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
            accountNumber.value = digitsOnly(accountNumber.value);
            accountName.value = cleanText(accountName.value);
            if (accountNumber.value.length !== 10) return showFieldError(accountNumber, 'Account number must contain exactly 10 digits.');
            if (!accountName.value) return showFieldError(accountName, 'Account name is required.');
            if (!requirePositiveNumber(amount, 'Requested amount')) return false;
            details.value = cleanText(details.value);
            if (fundingType !== 'gift' && parseFloat(rate.value || '0') < 0) return showFieldError(rate, 'Rate cannot be negative.');
            if (fundingType !== 'gift' && !validateDueDate(dueDate)) return false;
            return true;
        };

        const validateReviewForm = () => {
            const profileFields = document.getElementById('profile-completion-fields');
            if (profileFields?.classList.contains('hidden')) {
                const counterAmount = document.getElementById('counterAmount');
                const counterRate = document.getElementById('counterInterestRate');
                if (counterAmount.value && parseCurrencyAmount(counterAmount.value) <= 0) return showFieldError(counterAmount, 'Counter amount must be greater than zero.');
                if (counterRate.value && parseFloat(counterRate.value) < 0) return showFieldError(counterRate, 'Counter rate cannot be negative.');
                return true;
            }

            const phone = document.getElementById('acceptBorrowerPhone');
            const email = document.getElementById('acceptBorrowerEmail');
            const nin = document.getElementById('borrowerNIN');
            const bvn = document.getElementById('borrowerBVN');
            const accountNumber = document.getElementById('acceptAccountNumber');
            const accountName = document.getElementById('acceptAccountName');
            const counterAmount = document.getElementById('counterAmount');
            const counterRate = document.getElementById('counterInterestRate');

            if (!validateOptionalEmail(email, "Borrower's email")) return false;
            if (!validatePhoneInput(phone, 'Phone number')) return false;
            nin.value = digitsOnly(nin.value);
            bvn.value = digitsOnly(bvn.value);
            accountNumber.value = digitsOnly(accountNumber.value);
            accountName.value = cleanText(accountName.value);
            if (!isValidIdNumber(nin.value)) return showFieldError(nin, 'NIN must contain digits only, 11 to 12 numbers.');
            if (!isValidIdNumber(bvn.value)) return showFieldError(bvn, 'BVN must contain digits only, 11 to 12 numbers.');
            if (accountNumber.value.length !== 10) return showFieldError(accountNumber, 'Account number must contain exactly 10 digits.');
            if (!accountName.value) return showFieldError(accountName, 'Account name is required.');
            if (counterAmount.value && parseCurrencyAmount(counterAmount.value) <= 0) return showFieldError(counterAmount, 'Counter amount must be greater than zero.');
            if (counterRate.value && parseFloat(counterRate.value) < 0) return showFieldError(counterRate, 'Counter rate cannot be negative.');
            return true;
        };

        const validateCounterOffer = () => {
            const counterAmount = document.getElementById('counterAmount');
            const counterRate = document.getElementById('counterInterestRate');
            if (counterAmount.value && parseCurrencyAmount(counterAmount.value) <= 0) return showFieldError(counterAmount, 'Counter amount must be greater than zero.');
            if (counterRate.value && parseFloat(counterRate.value) < 0) return showFieldError(counterRate, 'Counter rate cannot be negative.');
            return true;
        };

        // New Loan Form (Lender)
        const newLoanForm = document.getElementById('new-loan-form');
        if(newLoanForm) {
            const borrowerLookupId = document.getElementById('borrowerLookupId');
            const borrowerLookupHint = document.getElementById('borrowerLookupHint');
            const lenderLegalConsent = document.getElementById('lenderLegalConsent');

            lenderLegalConsent?.addEventListener('change', (event) => {
                if (!event.target.checked) {
                    resetLegalConsentState('lender');
                    return;
                }
                if (!lenderLegalAccepted) {
                    event.target.checked = false;
                    openLegalConsentModal('lender', 'terms');
                }
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
            renderOfferPreview();

            newLoanForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (!lenderLegalAccepted || !lenderLegalConsent?.checked) {
                    openLegalConsentModal('lender', 'terms');
                    showToast('Review and agree to the Terms and Conditions before creating an offer.', 'info');
                    return;
                }
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
                showPage('dashboard');
            });
        }

        const requestLoanForm = document.getElementById('request-loan-form');
        if(requestLoanForm) {
            let borrowerFaceVerified = false;
            let borrowerFaceStream = null;
            let faceApiModelsLoaded = false;

            const requestLegalConsent = document.getElementById('requestLegalConsent');
            document.getElementById('scanLenderQrBtn')?.addEventListener('click', () => openQrScanner('lender'));

            document.querySelectorAll('#request-loan-form [data-legal-open]').forEach(button => {
                button.addEventListener('click', () => openLegalConsentModal('request', button.dataset.legalOpen));
            });

            requestLegalConsent?.addEventListener('change', (event) => {
                if (!event.target.checked) {
                    resetLegalConsentState('request');
                    return;
                }
                if (!requestLegalAccepted) {
                    event.target.checked = false;
                    openLegalConsentModal('request', 'terms');
                }
            });

            const stopBorrowerFaceCamera = () => {
                borrowerFaceStream?.getTracks().forEach(track => track.stop());
                borrowerFaceStream = null;
            };

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

            ['requestFundingType', 'requestLenderPaygoId', 'requestLoanPurpose', 'requestAmount', 'requestInterestRate', 'requestProfitExpected', 'requestInterestPeriod', 'requestRepaymentDate', 'requestRepaymentPlan'].forEach(id => {
                const input = document.getElementById(id);
                input?.addEventListener('input', renderRequestSummary);
                input?.addEventListener('change', renderRequestSummary);
            });
            renderRequestSummary();
            renderRequestProfileGate();
            setBankSelect('requestBankName', currentUser?.bankName || '');
            document.getElementById('requestAccountNumber') && (document.getElementById('requestAccountNumber').value = currentUser?.accountNumber || '');
            document.getElementById('requestAccountName') && (document.getElementById('requestAccountName').value = currentUser?.accountName || currentUser?.name || '');

            requestLoanForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const gate = getBorrowerProfileGate();
                if (!gate.isComplete) {
                    renderRequestProfileGate();
                    showToast('Complete your borrower profile before requesting funds.', 'info');
                    showPage('profile');
                    return;
                }
                if (!requestLegalAccepted || !requestLegalConsent?.checked) {
                    openLegalConsentModal('request', 'terms');
                    showToast('Review and agree to the Terms and Privacy Statement before sending your request.', 'info');
                    return;
                }
                if (!requestLoanForm.reportValidity() || !validateRequestForm()) return;
                const submitButton = requestLoanForm.querySelector('button[type="submit"]');
                submitButton && (submitButton.disabled = true);
                document.getElementById('faceVerificationCard')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const verified = borrowerFaceVerified || await verifyBorrowerFace();
                submitButton && (submitButton.disabled = false);
                if (!verified) {
                    return;
                }
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
                setBankSelect('requestBankName', currentUser?.bankName || '');
                document.getElementById('requestAccountNumber').value = currentUser?.accountNumber || '';
                document.getElementById('requestAccountName').value = currentUser?.accountName || currentUser?.name || '';
                document.getElementById('requestFundingType').dispatchEvent(new Event('change'));
                renderRequestSummary();
                showPage('dashboard');
            });
        }
        
        // Accept Loan Form (Borrower)
        const findLoanForm = document.getElementById('find-loan-form');
        const acceptLoanDetailsForm = document.getElementById('accept-loan-details-form');
        const loanSummaryDiv = document.getElementById('loan-summary');
        let foundLoan = null;

        const resetAcceptLoanPage = () => {
            acceptLoanDetailsForm.classList.add('hidden');
            findLoanForm.reset();
            acceptLoanDetailsForm.reset();
            document.getElementById('profile-completion-fields')?.classList.remove('hidden');
            document.querySelectorAll('#profile-completion-fields input, #profile-completion-fields select').forEach(input => {
                input.disabled = false;
            });
            setStateLgaPair('acceptBorrowerState', 'acceptBorrowerLga');
            setBankSelect('acceptBankName');
            setText('reviewBorrowerIdLabel', 'Borrower ID');
            setText('reviewBorrowerPinLabel', 'Borrower PIN');
            foundLoan = null;
        };

        findLoanForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const loanId = document.getElementById('loanIdInput').value.toUpperCase();
            foundLoan = loans.find(l => l.id === loanId && ['pending_borrower_acceptance', 'pending_lender_acceptance'].includes(l.status));

            if (foundLoan) {
                const reviewerRole = getPendingParty(foundLoan);
                const reviewPartyIdLabel = foundLoan.fundingType === 'gift' ? "Receiver's ID" : 'Borrower ID';
                const reviewPartyPinLabel = foundLoan.fundingType === 'gift' ? 'Receiver PIN' : 'Borrower PIN';
                setText('reviewBorrowerIdLabel', reviewPartyIdLabel);
                setText('reviewBorrowerPinLabel', reviewPartyPinLabel);
                const reviewBorrowerId = normalizeBorrowerId(document.getElementById('reviewBorrowerId')?.value || '');
                const reviewBorrowerPin = document.getElementById('reviewBorrowerPin')?.value || '';
                const expectedBorrowerId = normalizeBorrowerId(foundLoan.borrowerId || '');
                const borrowerProfile = borrowerDirectory[reviewBorrowerId];
                const expectedPin = foundLoan.borrowerPin || borrowerProfile?.pin || '';

                if (reviewerRole === 'borrower') {
                    if (!reviewBorrowerId || !reviewBorrowerPin) {
                        showToast(`Enter your ${reviewPartyIdLabel} and PIN before viewing this agreement.`, 'error');
                        acceptLoanDetailsForm.classList.add('hidden');
                        return;
                    }
                    if ((expectedBorrowerId && reviewBorrowerId !== expectedBorrowerId) || !borrowerProfile || reviewBorrowerPin !== expectedPin) {
                        showToast(`${reviewPartyIdLabel} or PIN is incorrect for this agreement.`, 'error');
                        acceptLoanDetailsForm.classList.add('hidden');
                        return;
                    }
                    currentUser = { ...(currentUser || {}), ...borrowerProfile };
                }

                const reviewerProfile = reviewerRole === 'borrower' ? (borrowerDirectory[reviewBorrowerId] || currentUser) : currentUser;
                const profileComplete = isProfileComplete(reviewerProfile, reviewerRole);
                const profileFields = document.getElementById('profile-completion-fields');
                loanSummaryDiv.innerHTML = renderAgreementSummaryCard(foundLoan, { statusText: 'Pending Review' });
                document.getElementById('reviewer-details-heading').textContent = profileComplete
                    ? 'Profile verified. Review terms or send a counter offer.'
                    : `Complete Your Profile to Accept as ${reviewerRole === 'lender' ? 'Lender' : 'Borrower'}`;
                document.getElementById('acceptBorrowerName').value = reviewerProfile?.name || (reviewerRole === 'lender' ? foundLoan.lender : foundLoan.borrower);
                document.getElementById('acceptBorrowerEmail').value = reviewerProfile?.email || currentUser?.email || '';
                document.getElementById('acceptBorrowerPhone').value = reviewerProfile?.phone || '';
                document.getElementById('acceptBorrowerDob').value = reviewerProfile?.dateOfBirth || '';
                document.getElementById('acceptBorrowerAddress').value = reviewerProfile?.residentialAddress || '';
                setStateLgaPair('acceptBorrowerState', 'acceptBorrowerLga', reviewerProfile?.state || foundLoan.borrowerState || '', reviewerProfile?.lga || foundLoan.borrowerLga || '');
                setBankSelect('acceptBankName', reviewerProfile?.bankName || foundLoan.borrowerBankName || '');
                document.getElementById('acceptAccountNumber').value = reviewerProfile?.accountNumber || foundLoan.borrowerAccountNumber || '';
                document.getElementById('acceptAccountName').value = reviewerProfile?.accountName || foundLoan.borrowerAccountName || reviewerProfile?.name || '';
                document.getElementById('borrowerNIN').value = reviewerProfile?.nin || '';
                document.getElementById('borrowerBVN').value = reviewerProfile?.bvn || '';
                document.getElementById('borrowerIdNumber').value = reviewerProfile?.idNumber || '';
                document.getElementById('counterAmount').value = formatAmountValue(foundLoan.amount);
                document.getElementById('counterInterestRate').value = foundLoan.interestRate || 0;
                profileFields?.classList.toggle('hidden', profileComplete);
                document.querySelectorAll('#profile-completion-fields input, #profile-completion-fields select').forEach(input => {
                    input.disabled = profileComplete;
                });
                acceptLoanDetailsForm.classList.remove('hidden');
                showToast(profileComplete ? 'Borrower verified. Agreement details loaded.' : 'Profile incomplete. Complete your profile before accepting.', profileComplete ? 'success' : 'info');
            } else {
                showToast('Invalid, already accepted, or closed Lendily ID.', 'error');
                acceptLoanDetailsForm.classList.add('hidden');
            }
        });

        document.getElementById('reject-loan-btn').addEventListener('click', () => {
             if (foundLoan) {
                foundLoan.status = 'rejected';
                showToast(`Agreement ${foundLoan.id} has been rejected.`, 'info');
                resetAcceptLoanPage();
                showPage('dashboard');
            }
        });

        document.getElementById('counter-loan-btn').addEventListener('click', () => {
             if (foundLoan) {
                if (!validateCounterOffer()) return;
                foundLoan.amount = parseCurrencyAmount(document.getElementById('counterAmount').value || foundLoan.amount);
                foundLoan.interestRate = foundLoan.fundingType === 'gift' ? 0 : parseFloat(document.getElementById('counterInterestRate').value || '0');
                foundLoan.status = foundLoan.status === 'pending_borrower_acceptance' ? 'pending_lender_acceptance' : 'pending_borrower_acceptance';
                showToast(`Counter sent for ${foundLoan.id}. The other party must review it.`, 'info');
                resetAcceptLoanPage();
                showPage('dashboard');
            }
        });


        acceptLoanDetailsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!acceptLoanDetailsForm.reportValidity() || !validateReviewForm()) return;
            const reviewerRole = getPendingParty(foundLoan);
            const profileFieldsHidden = document.getElementById('profile-completion-fields')?.classList.contains('hidden');
            currentUser = {
                ...(currentUser || {}),
                role: reviewerRole,
                name: document.getElementById('acceptBorrowerName').value,
                email: document.getElementById('acceptBorrowerEmail').value || currentUser?.email || '',
                phone: document.getElementById('acceptBorrowerPhone').value,
                dateOfBirth: document.getElementById('acceptBorrowerDob').value,
                residentialAddress: cleanText(document.getElementById('acceptBorrowerAddress').value),
                state: document.getElementById('acceptBorrowerState').value,
                lga: document.getElementById('acceptBorrowerLga').value,
                bankName: document.getElementById('acceptBankName').value,
                accountNumber: document.getElementById('acceptAccountNumber').value,
                accountName: cleanText(document.getElementById('acceptAccountName').value),
                nin: document.getElementById('borrowerNIN').value,
                bvn: document.getElementById('borrowerBVN').value,
                idNumber: cleanText(document.getElementById('borrowerIdNumber').value),
                idUploaded: profileFieldsHidden ? currentUser?.idUploaded : document.getElementById('borrowerIdUpload').files.length > 0,
                passportUploaded: profileFieldsHidden ? currentUser?.passportUploaded : document.getElementById('borrowerPassport').files.length > 0
            };
            const receiptDetails = document.getElementById('receipt-details');
            
            let lenderDetailsHtml = '';
            if (foundLoan.showLenderDetails) {
                 lenderDetailsHtml = `
                    <div class="bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
                        <h4 class="font-bold text-indigo-900">Funder Details</h4>
                        <div class="grid sm:grid-cols-3 gap-3 mt-3 text-sm">
                            ${renderSummaryRow('Name', foundLoan.lender)}
                            ${renderSummaryRow('Phone', foundLoan.lenderPhone)}
                            ${renderSummaryRow('Email', foundLoan.lenderEmail)}
                        </div>
                    </div>
                 `;
            } else {
                 lenderDetailsHtml = `
                    <div class="bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
                        <h4 class="font-bold text-indigo-900">Funder Details</h4>
                        <p class="text-slate-700 mt-1">This agreement is from a private funder.</p>
                    </div>
                 `;
            }

            receiptDetails.innerHTML = `
                <div class="space-y-4">
                    ${renderAgreementSummaryCard(foundLoan, { statusText: 'Ready to Accept' })}
                    ${renderPrivacyNotice()}
                    ${lenderDetailsHtml}
                    <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                        <h4 class="font-bold text-slate-900">Reviewer Summary</h4>
                        <div class="grid sm:grid-cols-2 gap-3 mt-3 text-sm">
                            ${renderSummaryRow('Full Name', document.getElementById('acceptBorrowerName').value)}
                            ${renderSummaryRow('Email', maskEmailDisplay(document.getElementById('acceptBorrowerEmail').value))}
                            ${renderSummaryRow('Phone', maskPhoneDisplay(document.getElementById('acceptBorrowerPhone').value))}
                            ${renderSummaryRow('NIN', maskSensitiveNumber(document.getElementById('borrowerNIN').value))}
                            ${renderSummaryRow('BVN', maskSensitiveNumber(document.getElementById('borrowerBVN').value))}
                            ${renderSummaryRow('Payout Account', `Account ending ${digitsOnly(document.getElementById('acceptAccountNumber').value).slice(-4) || '----'}`)}
                        </div>
                    </div>
                </div>
            `;
            receiptModal.classList.add('active');
        });

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

                showPage('dashboard');
            }
        });


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
                    const actionButtons = [
                        `<button class="share-agreement-btn bg-green-500 hover:bg-green-600 text-white text-sm transition" data-loan-id="${loan.id}"><i data-lucide="send" class="w-4 h-4"></i>Share</button>`,
                        pendingStatuses.includes(loan.status) ? `<button class="review-agreement-btn quick-action-btn text-sm text-slate-800" data-loan-id="${loan.id}"><i data-lucide="file-check-2" class="w-4 h-4"></i>Review</button>` : '',
                        isLender && loan.status === 'active' ? `<button class="enforce-btn bg-red-500 hover:bg-red-600 text-white text-sm transition" data-loan-id="${loan.id}"><i data-lucide="shield-alert" class="w-4 h-4"></i>Enforce</button>` : '',
                        loan.status === 'active' ? `<button class="reminder-btn bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm transition" data-loan-id="${loan.id}"><i data-lucide="bell-ring" class="w-4 h-4"></i>Reminder</button>` : ''
                    ].filter(Boolean).join('');

                    card.innerHTML = `
                        <div class="live-agreement-top">
                            <div class="flex items-start gap-3 min-w-0">
                                <div class="live-party-mark"><i data-lucide="${isLender ? 'user-round' : 'landmark'}" class="w-5 h-5"></i></div>
                                <div class="min-w-0">
                                    <h3 class="text-lg font-extrabold text-slate-900 truncate" title="${otherParty}">${displayParty}</h3>
                                    <p class="text-sm font-semibold text-slate-500">${role}</p>
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
                                <span>${loan.fundingType === 'gift' ? 'Recorded' : 'Total Due'}</span>
                                <strong>${formatCurrency(getDisplayTotal(loan))}</strong>
                            </div>
                        </div>
                        <div class="live-detail-grid text-sm">
                            <p><span>Type</span>${getFundingLabel(loan)}</p>
                            <p><span>Purpose</span>${getPurposeLabel(loan.loanPurpose)}</p>
                            <p class="live-detail-inline"><span>${chargeLabel}</span>${chargeValue}</p>
                            <p class="live-detail-inline"><span>Due Date</span>${formatDate(loan.dueDate)}</p>
                        </div>
                        <div>
                            <div class="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
                                <span>${loan.id}</span>
                                <span>${loan.status === 'active' ? 'In repayment' : 'Awaiting review'}</span>
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
        
        window.triggerEnforcement = (loanId) => { showToast(`Enforcement protocol initiated for loan ${loanId}.`, 'error'); };
        window.sendReminder = (loanId) => { showToast(`Payment reminder sent for loan ${loanId}.`, 'info'); };
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
            receiptDetails.innerHTML = `
                <div class="space-y-4">
                    ${renderAgreementSummaryCard(loan, { statusText: getStatusLabel(loan.status) })}
                    <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                        <h4 class="font-bold text-slate-900">Statement Dates</h4>
                        <div class="grid sm:grid-cols-3 gap-3 mt-3 text-sm">
                            ${renderSummaryRow('Transaction Date', formatDate(getTransactionDate(loan)))}
                            ${renderSummaryRow('Disbursed Date', formatDate(getDisbursedDate(loan)))}
                            ${renderSummaryRow('Reimbursed Date', formatDate(getReimbursedDate(loan)))}
                        </div>
                    </div>
                </div>
            `;
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

            const shareBtn = e.target.closest('.share-agreement-btn');
            if (shareBtn) shareAgreementOnWhatsApp(shareBtn.dataset.loanId);

            const reviewBtn = e.target.closest('.review-agreement-btn');
            if (reviewBtn) {
                showPage('accept-loan');
                document.getElementById('loanIdInput').value = reviewBtn.dataset.loanId;
                showToast(`Loaded ${reviewBtn.dataset.loanId}. Tap Find to review.`, 'info');
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
            refreshIcons();
            window.setTimeout(refreshIcons, 250);
        });
