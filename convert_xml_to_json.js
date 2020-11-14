const  convert = require('xml-js');
const fs = require('fs')
const path = require('path')
const xml2js = require('xml2js');


let xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<TestScenario>
   <TestSuite name="TS_EdgeHome">
      <TestCaseName name="tc_Login">dt_EdgeCaseHome,dt_EdgeCaseRoute</TestCaseName>
      <TestCaseName name="tc_Logout">dt_EdgeCaseRoute</TestCaseName>
   </TestSuite>
   <TestSuite name="TS_EdgePanel">
      <TestCaseName name="tc_AddContract">dt_EdgeCaseHome,dt_EdgeCaseSpectrum</TestCaseName>
   </TestSuite>
      <TestSuite name="TS_EdgeRoute">
      <TestCaseName name="tc_VerifyContract">dt_EdgeCaseRoute</TestCaseName>
      <TestCaseName name="tc_Payment">dt_EdgeCaseRoute</TestCaseName>
   </TestSuite>
   <TestSuite name="TS_EdgeSpectrum">
      <TestCaseName name="tc_ClientFeedback">dt_EdgeCaseSpectrum</TestCaseName>
   </TestSuite>
</TestScenario>`;
let xmlString2 = `<?xml version="1.0" encoding="UTF-8"?>
<LangDef langCode="0401" xsi:noNamespaceSchemaLocation="HMILinguist_Texts.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <LangID ID="Assigned_Location_Main_Text" Text="Assigned location:"/>
    <LangID ID="Audio_Sync_Headline" Text="مزامنة الصوت"/>
    <LangID ID="Audio_Sync_Main_Text" Text="ضبط يدوي"/>
    <LangID ID="BTN_Cancel" Text="إلغاء"/>
    <LangID ID="BTN_DELETE" Text="حذف"/>
    <LangID ID="BTN_INSTALL" Text="تثبيت"/>
    <LangID ID="BTN_LATER" Text="لاحقا"/>
    <LangID ID="BTN_Left" Text="يسار"/>
    <LangID ID="BTN_NO" Text="لا"/>
    <LangID ID="BTN_OK" Text="موافق"/>
    <LangID ID="BTN_RETRY" Text="إعادة محاولة"/>
    <LangID ID="BTN_Right" Text="يمين"/>
    <LangID ID="BTN_SAVE" Text="حفظ"/>
    <LangID ID="BTN_START" Text="بدء"/>
    <LangID ID="BTN_YES" Text="نعم"/>
    <LangID ID="BT_Name_Main_Text" Text="BT name:"/>
    <LangID ID="Blocked_Browser_Headline" Text="التحكم عن بعد"/>
    <LangID ID="Blocked_Browser_Main_Text" Text="بحث عن رمز QR لعرضه على جهازك:"/>
    <LangID ID="Bluetooth_Audio_Sync_Complete" Text="اكتملت مزامنة الصوت."/>
    <LangID ID="Bluetooth_Audio_Sync_Error" Text="فشلت مزامنة الصوت.\nيرجى إعادة المحاولة لاحقًا."/>
    <LangID ID="Bluetooth_Audio_Sync_Headline" Text="مزامنة الصوت"/>
    <LangID ID="Bluetooth_Audio_Sync_In_Progress" Text="جاري المزامنة...\n{0}%"/>
    <LangID ID="Bluetooth_Audio_Sync_Main_Text" Text="أمسك سماعة الرأس بالقرب من\nالميكروفون بالشاشة\nواضغط بدء. سوف يتم كتم\nالصوت أثناء عملية المزامنة."/>
    <LangID ID="Bluetooth_Headline" Text="مخرج صوت Bluetooth"/>
    <LangID ID="Bluetooth_Status" Text="BLUETOOTH"/>
    <LangID ID="Bluetooth_Visibility_Main_Text" Text="إقران سماعة رأس جديدة؟\nيجب أن تكون سماعة الرأس في وضع الإقران"/>
    <LangID ID="Cancel_Download_Headline" Text="تحديث البرنامج"/>
    <LangID ID="Cancel_Download_Main_Text" Text="هل أنت متأكد من أنك تريد إلغاء التنزيل؟"/>
    <LangID ID="Checkbox_Text" Text="عدم إظهار مجددًا"/>
    <LangID ID="Child_Lock_Activated_Notification" Text="تم تفعيل ميزة قفل الطفل"/>
    <LangID ID="Child_Lock_Active_Notification" Text="ميزة قفل الطفل مفعلة"/>
    <LangID ID="Child_Lock_Deactivated_Notification" Text="تم إلغاء تفعيل ميزة قفل الطفل"/>
    <LangID ID="Connection_Assistant_1_Headline" Text="مساعد الاتصال 1 من 2"/>
    <LangID ID="Connection_Assistant_2_Headline" Text="مساعد الاتصال 2 من 2"/>
    <LangID ID="Connection_Assistant_Headline" Text="مساعد الاتصال"/>
    <LangID ID="Connection_Assistant_Help_Text" Text="أو اضغط على زر التشغيل أدناه\nلفتح القائمة السريعة."/>
    <LangID ID="Connection_Assistant_QR_Code_1_Main_Text" Text="ابحث عن رمز QR للاتصال\nبالشبكة عبر Wi-Fi:"/>
    <LangID ID="Connection_Assistant_QR_Code_2_SOP1_Main_Text" Text="Ensure your device and this screen are on\nthe same Wi-Fi network to stream media"/>
    <LangID ID="Connection_Assistant_QR_Code_2_SOP1_Scan_Text" Text="Scan the QR code to connect:"/>
    <LangID ID="Connection_Assistant_QR_Code_2_SOP2_Main_Text" Text="ابحث عن رمز QR لتنزيل تطبيق\nالتحكم في ترفيه Audi."/>
    <LangID ID="Connection_Failed_Headline" Text="شبكة Wi-Fi"/>
    <LangID ID="Connection_Failed_Main_Text" Text="تعذر إنشاء\nالاتصال بالشبكة."/>
    <LangID ID="Connection_Failed_Password_Headline" Text="شبكة Wi-Fi"/>
    <LangID ID="Connection_Failed_Password_Main_Text" Text="فشل الاتصال.\nتحقق من كلمة المرور الخاصة بك."/>
    <LangID ID="Crosslink_Headline" Text="إعدادات Crosslink"/>
    <LangID ID="Crosslink_Host_Main_Text" Text="تم الشروع في عملية إقران Crosslink."/>
    <LangID ID="Crosslink_Host_SSID_Text" Text="SSID: {0}"/>
    <LangID ID="Crosslink_Host_Waiting_Text" Text="يرجى الانتظار..."/>
    <LangID ID="Crosslink_Pairing_Name_Text" Text="اسم الشاشة: {0}"/>
    <LangID ID="Crosslink_Pairing_Successful_Text" Text="تم إعداد Crosslink بنجاح."/>
    <LangID ID="Crosslink_Pairing_Text" Text="جاري الإقران..."/>
    <LangID ID="Crosslink_Screen_Main_Text" Text="يرجى تحديد جانب المركبة\nالذي تريد تعيينه لهذه الشاشة."/>
    <LangID ID="Crosslink_Searching_Text" Text="البحث..."/>
    <LangID ID="Delete_Device_Main_Text" Text="هل ترغب فعلاً في محو جهاز البلوتوث هذا؟"/>
    <LangID ID="Delete_Install_Headline" Text="تحديث البرنامج"/>
    <LangID ID="Delete_Install_Main_Text" Text="هل أنت متأكد من أنك تريد حذف تحديث البرنامج؟"/>
    <LangID ID="Delete_Network_Main_Text" Text="هل أنت متأكد من أنك تريد حذف هذه الشبكة؟"/>
    <LangID ID="Device_Search_Menu_Text" Text="البحث..."/>
    <LangID ID="Download_Failed_Headline" Text="تحديث البرنامج"/>
    <LangID ID="Download_Failed_Main_Text" Text="فشل تنزيل البرنامج.\nهل تريد إعادة المحاولة؟"/>
    <LangID ID="Help_Headline" Text="دليل المستخدِم"/>
    <LangID ID="IP_Address_Main_Text" Text="IP address:"/>
    <LangID ID="IVI_Active_Status" Text="إحالة الصوت إلى السيارة"/>
    <LangID ID="IVI_Delete_Confirm" Text="هل أنت متأكد من أنك ترغب في حذف\n{0}؟\nملاحظة: خرج الصوت إلى سماعات السيارة\nلن يتوفر بعد الآن."/>
    <LangID ID="IVI_Headline" Text="إحالة الصوت إلى السيارة"/>
    <LangID ID="IVI_Main_Text" Text="يرجى تحديد اسم الشاشة كمصدر صوت\nBluetooth على نظام المعلومات والترفيه.\nيتم تحديد الحد الأقصى للصوت عن طريق\nالصوت الرئيسي للمعلومات والترفيه."/>
    <LangID ID="IVI_Pairing_Failed" Text="فشل الإقران.\nيرجى إعادة المحاولة لاحقًا."/>
    <LangID ID="IVI_Pairing_Headline" Text="إحالة الصوت إلى السيارة"/>
    <LangID ID="IVI_Pairing_In_Progress" Text="جاري الإقران..."/>
    <LangID ID="IVI_Pairing_Search" Text="البحث..."/>
    <LangID ID="IVI_Sync_Complete" Text="اكتملت مزامنة الصوت."/>
    <LangID ID="IVI_Sync_Error" Text="حدث خطأ.\nتعذرت مزامنة الصوت.\nيرجى إعادة المحاولة لاحقًا."/>
    <LangID ID="IVI_Sync_In_Progress" Text="جاري المزامنة...\n{0}%"/>
    <LangID ID="IVI_Sync_Main_Text" Text="حدد اسم شاشة كمصدر صوت\nBluetooth بنظام المعلومات\nوالترفيه.\nتحقق من الصوت وقلل من\nضوضاء الخلفية.\nاضغط &quot;بدء&quot; لو النظام جاهز."/>
    <LangID ID="Install_Active_Headline" Text="ملاحظة"/>
    <LangID ID="Install_Active_Main_Text" Text="جار تثبيت التحديث\nاكتمل {0}%\n\nيرجى التأكد من تشغيل المركبة\nلحين اكتمال التحديث.\n\nستتم إعادة تشغيل النظام\nبمجرد اكتمال التثبيت."/>
    <LangID ID="Install_Available_Headline" Text="تحديث البرنامج"/>
    <LangID ID="Install_Available_Main_Text" Text="تثبيت البرنامج متوفر.\nهل ترغب في التثبيت الآن؟\n\nأثناء التحديث، النظام سيكون متعطلاً."/>
    <LangID ID="Install_Delete_Headline" Text="تحديث البرنامج"/>
    <LangID ID="Install_Delete_Main_Text" Text="هل ترغب في تثبيت التحديثأم حذفه؟\n\nأثناء عملية التحديث، النظام سيكون متعطلاً."/>
    <LangID ID="Install_Failed_Headline" Text="تحديث البرنامج"/>
    <LangID ID="Install_Failed_Main_Text" Text="فشل تثبيت البرنامج.\nهل ترغب في إعادة المحاولة؟"/>
    <LangID ID="Install_Successful_Headline" Text="تحديث البرنامج"/>
    <LangID ID="Install_Successful_Main_Text" Text="تم التثبيت بنجاح.\nتم تحديث البرنامج."/>
    <LangID ID="Language_Arabic" Text="العربية"/>
    <LangID ID="Language_Cantonese" Text="繁體中文"/>
    <LangID ID="Language_Chinese" Text="简体中文"/>
    <LangID ID="Language_Czech" Text="Čeština"/>
    <LangID ID="Language_Danish" Text="Dansk"/>
    <LangID ID="Language_Dutch" Text="Nederlands"/>
    <LangID ID="Language_English_UK" Text="English (UK)"/>
    <LangID ID="Language_English_US" Text="English (US)"/>
    <LangID ID="Language_French" Text="Français"/>
    <LangID ID="Language_French_Can" Text="Français (Canada)"/>
    <LangID ID="Language_German" Text="Deutsch"/>
    <LangID ID="Language_Greek" Text="Ελληνικά"/>
    <LangID ID="Language_Headline" Text="اللغة (Language)"/>
    <LangID ID="Language_Hungarian" Text="Magyar"/>
    <LangID ID="Language_Italian" Text="Italiano"/>
    <LangID ID="Language_Japanese" Text="日本語"/>
    <LangID ID="Language_Korean" Text="한국어"/>
    <LangID ID="Language_Norwegian" Text="Norsk"/>
    <LangID ID="Language_Polish" Text="Polski"/>
    <LangID ID="Language_Port_Br" Text="Português (Brasil)"/>
    <LangID ID="Language_Portuguese" Text="Português"/>
    <LangID ID="Language_Preview_Arabic" Text="العربية"/>
    <LangID ID="Language_Preview_Cantonese" Text="繁體中文"/>
    <LangID ID="Language_Preview_Chinese" Text="简体中文"/>
    <LangID ID="Language_Preview_Czech" Text="Čeština"/>
    <LangID ID="Language_Preview_Danish" Text="Dansk"/>
    <LangID ID="Language_Preview_Dutch" Text="Nederlands"/>
    <LangID ID="Language_Preview_English_UK" Text="English (UK)"/>
    <LangID ID="Language_Preview_English_US" Text="English (US)"/>
    <LangID ID="Language_Preview_French" Text="Français"/>
    <LangID ID="Language_Preview_French_Can" Text="Français (Canada)"/>
    <LangID ID="Language_Preview_German" Text="Deutsch"/>
    <LangID ID="Language_Preview_Greek" Text="Ελληνικά"/>
    <LangID ID="Language_Preview_Hungarian" Text="Magyar"/>
    <LangID ID="Language_Preview_Italian" Text="Italiano"/>
    <LangID ID="Language_Preview_Japanese" Text="日本語"/>
    <LangID ID="Language_Preview_Korean" Text="한국어"/>
    <LangID ID="Language_Preview_Norwegian" Text="Norsk"/>
    <LangID ID="Language_Preview_Polish" Text="Polski"/>
    <LangID ID="Language_Preview_Port_Br" Text="Português (Brasil)"/>
    <LangID ID="Language_Preview_Portuguese" Text="Português"/>
    <LangID ID="Language_Preview_Romanian" Text="Română"/>
    <LangID ID="Language_Preview_Russian" Text="Русский"/>
    <LangID ID="Language_Preview_Spanish" Text="Español"/>
    <LangID ID="Language_Preview_Spanish_US" Text="Español (México)"/>
    <LangID ID="Language_Preview_Swedish" Text="Svenska"/>
    <LangID ID="Language_Preview_Taiwanese" Text="繁體中文 (台灣)"/>
    <LangID ID="Language_Preview_Turkish" Text="Türkçe"/>
    <LangID ID="Language_Romanian" Text="Română"/>
    <LangID ID="Language_Russian" Text="Русский"/>
    <LangID ID="Language_Spanish" Text="Español"/>
    <LangID ID="Language_Spanish_US" Text="Español (México)"/>
    <LangID ID="Language_Swedish" Text="Svenska"/>
    <LangID ID="Language_Taiwanese" Text="繁體中文 (台灣)"/>
    <LangID ID="Language_Turkish" Text="Türkçe"/>
    <LangID ID="Legal_Info_Headline" Text="Legal information and privacy policy"/>
    <LangID ID="MCU_Version_Main_Text" Text="MCU version:"/>
    <LangID ID="Max_Volume_Notification" Text="تم ضبط صوت الشاشة إلى الحد الأقصى.\nقم بزيادة صوت نظام المعلومات والترفيه."/>
    <LangID ID="Memory_Usage_Main_Text" Text="Memory usage:"/>
    <LangID ID="Menu_Download_Active" Text="إلغاء التنزيل"/>
    <LangID ID="Menu_Download_Active_Preview" Text="{0}%"/>
    <LangID ID="Menu_Help_Crosslink" Text="حدد <span id=\"text_Highlight\">CROSSLINK</span> لمشاهدة محتوى معروض حاليًا\nعلى شاشة مصاحبة. ملاحظة: عند تحديد Crosslink\nبينما تكون مشاركة الصوت مفعلة، تكون أدوات التحكم\nفي الصوت غير متوفرة."/>
    <LangID ID="Menu_Help_HDMI" Text="يمكن تشغيل محتوى من مصدر HDMI\nعند توصيل جهاز متوافق.\nملاحظة: إذا لم يتم تشغيل أي محتوى على جهاز HDMI\nعند تحديده، ستظهر الشاشة فارغة."/>
    <LangID ID="Menu_Help_Input" Text="حدد <span id=\"text_Highlight\">&quot;مدخل&quot;</span> للتوصيل بشبكة Wi-Fi.\nيتيح ذلك لك بث محتوى عبر\nالموفرين الخارجيين أو لإنشاء اتصال\nبجهازك لمشاركة المحتوى."/>
    <LangID ID="Menu_Help_Intro" Text="يسمح نظام ترفيه Audi بعرض المحتوى\nوالاستماع إليه من جهازك المحمول المتصل عبر\nWi-Fi أو من جهاز متوافق متصل\nعبر HDMI أو USB."/>
    <LangID ID="Menu_Help_OTA" Text="To discover new features and bug fixes,\ndownload the latest software from the settings menu."/>
    <LangID ID="Menu_Help_Output_SOP1" Text="حدد &quot;<span id=\"text_Highlight\">BLUETOOTH</span>&quot; لتوصيل سماعة رأس Bluetooth\nأو اضغط على زر مشاركة الصوت\nلإرسال الصوت إلى سماعات السيارة.\nالصوت متوفر أيضًا عبر سماعة الرأس السلكية."/>
    <LangID ID="Menu_Help_Output_SOP2" Text="حدد &quot;<span id=\"text_Highlight\">BLUETOOTH</span>&quot; لتوصيل سماعة رأس Bluetooth\nأو اضغط على زر مشاركة الصوت\nلإرسال الصوت إلى سماعات السيارة.\nالصوت متوفر أيضًا عبر سماعة الرأس السلكية."/>
    <LangID ID="Menu_Help_Source" Text="حدد &quot;<span id=\"text_Highlight\">مصدر</span>&quot; لاختيار المحتوى المطلوب.\nيمكنك عرض المحتوى من الموفرين الخارجيين\nبتحديد الخدمة من القائمة المعروضة.\nيمكن إعادة تعيين المتصفح أيضًا في هذه القائمة."/>
    <LangID ID="Menu_Help_USB" Text="يمكن تشغيل الوسائط عبر جهاز متوافق\nمتصل عبر USB باستخدام تطبيق\nالتحكم في ترفيه Audi."/>
    <LangID ID="Menu_Install_Update" Text="تثبيت التحديث"/>
    <LangID ID="Menu_Legal_About_Us" Text="About us"/>
    <LangID ID="Menu_Legal_Open_Source" Text="Open source declaration"/>
    <LangID ID="Menu_Legal_Privacy_Policy" Text="Privacy policy"/>
    <LangID ID="Menu_Settings_Acoustic_Feedback" Text="مردود صوتي"/>
    <LangID ID="Menu_Settings_Audio_Sync" Text="مزامنة الصوت"/>
    <LangID ID="Menu_Settings_Brightness_Persistence" Text="استمرار السطوع"/>
    <LangID ID="Menu_Settings_Connection_Assistant" Text="مساعد الاتصال"/>
    <LangID ID="Menu_Settings_IVI_Pairing" Text="إحالة الصوت إلى السيارة"/>
    <LangID ID="Menu_Settings_Language" Text="اللغة (Language)"/>
    <LangID ID="Menu_Settings_Legal_Info" Text="Legal information and privacy policy"/>
    <LangID ID="Menu_Settings_Screen_Off" Text="إيقاف الشاشة"/>
    <LangID ID="Menu_Settings_Screen_Timeout" Text="إطفاء أوتوماتيكي للشاشة"/>
    <LangID ID="Menu_Settings_Software" Text="برنامج"/>
    <LangID ID="Menu_Settings_Volume_Persistence" Text="إستمرارية الصوت"/>
    <LangID ID="Menu_Software_Analytics" Text="الملاحظات التحليلية"/>
    <LangID ID="Menu_Software_Reset" Text="استعادة إعدادات المصنع"/>
    <LangID ID="Menu_Software_Update" Text="تحقق من وجود تحديثات"/>
    <LangID ID="Menu_Software_Update_Check" Text="جار التحقق من وجود تحديثات..."/>
    <LangID ID="Menu_Software_Version" Text="معلومات البرمجيات"/>
    <LangID ID="Network_Search_Main_Text" Text="البحث..."/>
    <LangID ID="No_Connection_Status" Text="غير متصل"/>
    <LangID ID="No_Device_Status" Text="غير متصل"/>
    <LangID ID="No_Devices_Main_Text" Text="لم يتم العثور على أجهزة"/>
    <LangID ID="No_Updates_Headline" Text="تحديث البرنامج"/>
    <LangID ID="No_Updates_Main_Text" Text="لا تتوفر تحديثات."/>
    <LangID ID="Notification_Bluetooth_Unavailable" Text="Bluetooth غير متوفر حاليًا"/>
    <LangID ID="Notification_Brightness_Unavailable" Text="أدوات التحكم في السطوع غير متوفرة حاليًا"/>
    <LangID ID="Notification_Child_Lock_Unavailable" Text="ميزة قفل الطفل غير متوفرة حاليًا"/>
    <LangID ID="Notification_Connecting" Text="جاري الاتصال..."/>
    <LangID ID="Notification_Crosslink_Unavailable" Text="Crosslink غير متوفر حاليًا"/>
    <LangID ID="Notification_Error_Reconnect" Text="تم فقد الاتصال. جاري محاولة إعادة الاتصال..."/>
    <LangID ID="Notification_Full_Screen_Unavailable" Text="وضع ملء الشاشة غير متوفر حاليًا"/>
    <LangID ID="Notification_HDMI_Unavailable" Text="HDMI غير متوفر حاليًا"/>
    <LangID ID="Notification_Help_Unavailable" Text="دليل المستخدم غير متوفر حاليًا"/>
    <LangID ID="Notification_IVI_Unavailable" Text="مشاركة الصوت غير متوفرة حاليًا"/>
    <LangID ID="Notification_Initialising" Text="جار التهيئة..."/>
    <LangID ID="Notification_Mute_Unavailable" Text="كتم الصوت غير متوفر حاليًا"/>
    <LangID ID="Notification_OTT_Unavailable" Text="موفر المحتوى الخارجي غير متوفر حاليًا"/>
    <LangID ID="Notification_Quick_Menu_Unavailable" Text="القائمة السريعة غير متوفرة حاليًا"/>
    <LangID ID="Notification_SOP1_Funcion_Unavailable" Text="الوظيفة ليست متاحة حاليا"/>
    <LangID ID="Notification_Screen_Unavailable" Text="الشاشة غير متوفرة حاليًا"/>
    <LangID ID="Notification_Temperature" Text="درجة حرارة الشاشة أعلى من اللازم. سيتم إيقاف\nتشغيل النظام قريبًا لتفادي التلف."/>
    <LangID ID="Notification_Volume_Unavailable" Text="أدوات التحكم في الصوت غير متوفرة حاليًا"/>
    <LangID ID="Notification_WiFi_Unavailable" Text="Wi-Fi غير متوفرة حاليًا"/>
    <LangID ID="PIN_Entry_Help_Text" Text="إدخال رقم PIN"/>
    <LangID ID="PIN_Entry_Main_Text" Text="يرجى إدخال\nPIN لجهاز\n.Bluetooth الخاص بك"/>
    <LangID ID="Pairing_Failed_Headline" Text="مخرج صوت Bluetooth"/>
    <LangID ID="Pairing_Failed_Main_Text" Text="فشل الاتصال.\nيرجى إعادة المحاولة لاحقًا."/>
    <LangID ID="Pairing_Failed_Wrong_PIN_Headline" Text="مخرج صوت Bluetooth"/>
    <LangID ID="Pairing_Failed_Wrong_PIN_Main_Text" Text="فشل الاتصال.\nيرجى التحقق من PIN."/>
    <LangID ID="Password_Speller_Help_Text" Text="أدخل كلمة  المرور"/>
    <LangID ID="Quick_Menu_Full_Screen" Text="الصورة الكاملة"/>
    <LangID ID="Quick_Menu_Help" Text="دليل المستخدِم"/>
    <LangID ID="Quick_Menu_Screen_Off" Text="إيقاف الشاشة"/>
    <LangID ID="Quick_Menu_Settings" Text="الإعدادات"/>
    <LangID ID="Quick_Menu_Source" Text="المصدر"/>
    <LangID ID="RSE_Version_Main_Text" Text="RSE version:"/>
    <LangID ID="Remote_Crosslink_Notification" Text="تم تغيير المصدر – Crosslink مفعل"/>
    <LangID ID="Remote_HDMI_Notification" Text="تم تغيير المصدر – HDMI مفعل"/>
    <LangID ID="Rename_Device_Headline" Text="إعادة تسمية الجهاز"/>
    <LangID ID="Reset_Browser_Headline" Text="إعادة تعيين المتصفح"/>
    <LangID ID="Reset_Browser_Main_Text" Text="هل أنت متأكد من أنك تريد إعادة تعيين المتصفح؟\nسيتم فقد كل معلومات الحساب\nوستحتاج إلى تسجيل الدخول مرة أخرى."/>
    <LangID ID="Run_Time_Main_Text" Text="Running time:"/>
    <LangID ID="Screen_Off_Notification" Text="يرجى النقر على الشاشة لتشغيلها"/>
    <LangID ID="Screen_Timeout_Headline" Text="إطفاء أوتوماتيكي للشاشة"/>
    <LangID ID="Settings_Headline" Text="الإعدادات"/>
    <LangID ID="Shutting_Down_Notification" Text="يتم إغلاق النظام..."/>
    <LangID ID="Software_Reset_Headline" Text="استعادة إعدادات المصنع"/>
    <LangID ID="Software_Reset_Main_Text" Text="باستعادة النظام، سيُعاد تعيين كل\nالإعدادات. ستُحذف كل البيانات الشخصية\n بما في ذلك الشبكات وأجهزة Bluetooth وكلمات\nالمرور المحفوظة.\n\nهل أنت متأكد من أنك تريد إعادة التعيين؟"/>
    <LangID ID="Software_Reset_Successful_Headline" Text="استعادة إعدادات المصنع"/>
    <LangID ID="Software_Reset_Successful_Main_Text" Text="تمت استعادة إعدادات المصنع.\nسيُعاد بدء تشغيل النظام قريبًا."/>
    <LangID ID="Software_Update_Headline" Text="برنامج"/>
    <LangID ID="Software_Version_Headline" Text="معلومات البرمجيات"/>
    <LangID ID="Software_Version_Main_Text" Text="إصدار البرنامج"/>
    <LangID ID="Source_Device_Menu_Text" Text="محتوى من جهازك"/>
    <LangID ID="Source_HDMI_Menu_Text" Text="HDMI"/>
    <LangID ID="Source_Headline" Text="المصدر"/>
    <LangID ID="Source_Netflix_Menu_Text" Text="Netflix"/>
    <LangID ID="Source_Screensaver_Menu_Text" Text="شاشة التوقف"/>
    <LangID ID="Timeout_Option_1" Text="مطلقاً"/>
    <LangID ID="Timeout_Option_2" Text="30 ثانية"/>
    <LangID ID="Timeout_Option_3" Text="1 دقيقة"/>
    <LangID ID="Timeout_Option_4" Text="5 دقائق"/>
    <LangID ID="Timeout_Option_5" Text="10 دقائق"/>
    <LangID ID="Timeout_Option_6" Text="30 دقيقة"/>
    <LangID ID="Timeout_Preview_Option_1" Text="مطلقاً"/>
    <LangID ID="Timeout_Preview_Option_2" Text="30 ثانية"/>
    <LangID ID="Timeout_Preview_Option_3" Text="1 دقيقة"/>
    <LangID ID="Timeout_Preview_Option_4" Text="5 دقائق"/>
    <LangID ID="Timeout_Preview_Option_5" Text="10 دقائق"/>
    <LangID ID="Timeout_Preview_Option_6" Text="30 دقيقة"/>
    <LangID ID="Update_Available_Headline" Text="تحديث البرنامج"/>
    <LangID ID="Update_Available_Main_Text" Text="يتوفر تحديث للبرنامج.\nتنزيل الآن؟"/>
    <LangID ID="Update_Unavailable_Headline" Text="تحديث البرنامج"/>
    <LangID ID="Update_Unavailable_Main_Text" Text="تعذر التحقق من وجود تحديثات.\nيرجى إعادة المحاولة لاحقًا."/>
    <LangID ID="Use_Extension_Headline" Text="ملاحظة"/>
    <LangID ID="Use_Extension_Main_Text_PL" Text="سيتم إيقاف تشغيل نظام ترفيه\nAudi خلال {0} ثوان.\nاضغط على موافق لتمديد الاستخدام."/>
    <LangID ID="Use_Extension_Main_Text_SG" Text="سيتم إيقاف تشغيل نظام ترفيه\nAudi خلال {0} ثانية.\nاضغط على موافق لتمديد الاستخدام."/>
    <LangID ID="Wi-Fi_Status" Text="شبكة WI-FI"/>
    <LangID ID="WiFi_Headline" Text="شبكة Wi-Fi"/>
</LangDef>
`
let xmlString3 = `<?xml version="1.0" encoding="UTF-8"?>
<LangDef langCode="0404" xsi:noNamespaceSchemaLocation="HMILinguist_Texts.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <LangID ID="Assigned_Location_Main_Text" Text="Assigned location:"/>
    <LangID ID="Audio_Sync_Headline" Text="音訊同步"/>
    <LangID ID="Audio_Sync_Main_Text" Text="手動調整"/>
    <LangID ID="BTN_Cancel" Text="取消"/>
    <LangID ID="BTN_DELETE" Text="刪除"/>
    <LangID ID="BTN_INSTALL" Text="安裝"/>
    <LangID ID="BTN_LATER" Text="稍後"/>
    <LangID ID="BTN_Left" Text="左側"/>
    <LangID ID="BTN_NO" Text="否"/>
    <LangID ID="BTN_OK" Text="確定"/>
    <LangID ID="BTN_RETRY" Text="重試"/>
    <LangID ID="BTN_Right" Text="右側"/>
    <LangID ID="BTN_SAVE" Text="儲存"/>
    <LangID ID="BTN_START" Text="開始"/>
    <LangID ID="BTN_YES" Text="是"/>
    <LangID ID="BT_Name_Main_Text" Text="BT name:"/>
    <LangID ID="Blocked_Browser_Headline" Text="遠端連結"/>
    <LangID ID="Blocked_Browser_Main_Text" Text="掃描 QR 碼以檢視您的裝置："/>
    <LangID ID="Bluetooth_Audio_Sync_Complete" Text="音訊同步完成。"/>
    <LangID ID="Bluetooth_Audio_Sync_Error" Text="音訊同步失敗。\n請稍後再試。"/>
    <LangID ID="Bluetooth_Audio_Sync_Headline" Text="音訊同步"/>
    <LangID ID="Bluetooth_Audio_Sync_In_Progress" Text="同步中...\n{0}%"/>
    <LangID ID="Bluetooth_Audio_Sync_Main_Text" Text="使耳機靠近\n螢幕上的麥克風\n並按 [開始]。\n音訊在同步過程中\n將會靜音。"/>
    <LangID ID="Bluetooth_Headline" Text="藍牙"/>
    <LangID ID="Bluetooth_Status" Text="藍牙"/>
    <LangID ID="Bluetooth_Visibility_Main_Text" Text="配對新耳機？\n耳機必須處於配對模式。"/>
    <LangID ID="Cancel_Download_Headline" Text="軟體更新"/>
    <LangID ID="Cancel_Download_Main_Text" Text="確定要取消\n下載？"/>
    <LangID ID="Checkbox_Text" Text="不再顯示"/>
    <LangID ID="Child_Lock_Activated_Notification" Text="童鎖已啟動"/>
    <LangID ID="Child_Lock_Active_Notification" Text="童鎖作用中"/>
    <LangID ID="Child_Lock_Deactivated_Notification" Text="童鎖已停用"/>
    <LangID ID="Connection_Assistant_1_Headline" Text="連線助理 1/2"/>
    <LangID ID="Connection_Assistant_2_Headline" Text="連線助理 2/2"/>
    <LangID ID="Connection_Assistant_Headline" Text="連線助理"/>
    <LangID ID="Connection_Assistant_Help_Text" Text="或按下面的電源按鈕\n以開啟快速功能表。"/>
    <LangID ID="Connection_Assistant_QR_Code_1_Main_Text" Text="掃描 QR 碼以透過\nWi-Fi 連線至螢幕："/>
    <LangID ID="Connection_Assistant_QR_Code_2_SOP1_Main_Text" Text="Ensure your device and this screen are on\nthe same Wi-Fi network to stream media"/>
    <LangID ID="Connection_Assistant_QR_Code_2_SOP1_Scan_Text" Text="Scan the QR code to connect:"/>
    <LangID ID="Connection_Assistant_QR_Code_2_SOP2_Main_Text" Text="掃描 QR 碼以下載\nAudi Entertainment\nControl app。"/>
    <LangID ID="Connection_Failed_Headline" Text="Wi-Fi"/>
    <LangID ID="Connection_Failed_Main_Text" Text="無法建立網路連線。"/>
    <LangID ID="Connection_Failed_Password_Headline" Text="Wi-Fi"/>
    <LangID ID="Connection_Failed_Password_Main_Text" Text="連線失敗。\n請檢查您的密碼。"/>
    <LangID ID="Crosslink_Headline" Text="交叉連結設定"/>
    <LangID ID="Crosslink_Host_Main_Text" Text="交叉連結配對程序已開始。"/>
    <LangID ID="Crosslink_Host_SSID_Text" Text="SSID：{0}"/>
    <LangID ID="Crosslink_Host_Waiting_Text" Text="請稍候..."/>
    <LangID ID="Crosslink_Pairing_Name_Text" Text="螢幕名稱：{0}"/>
    <LangID ID="Crosslink_Pairing_Successful_Text" Text="交叉連結設定成功。"/>
    <LangID ID="Crosslink_Pairing_Text" Text="配對中..."/>
    <LangID ID="Crosslink_Screen_Main_Text" Text="請選擇您要指派至此螢幕的車輛側。"/>
    <LangID ID="Crosslink_Searching_Text" Text="正在搜尋..."/>
    <LangID ID="Delete_Device_Main_Text" Text="確定要刪除這些檔案嗎？"/>
    <LangID ID="Delete_Install_Headline" Text="軟體更新"/>
    <LangID ID="Delete_Install_Main_Text" Text="確定要刪除軟體更新嗎？"/>
    <LangID ID="Delete_Network_Main_Text" Text="確定要刪除此網路？"/>
    <LangID ID="Device_Search_Menu_Text" Text="正在搜尋..."/>
    <LangID ID="Download_Failed_Headline" Text="軟體更新"/>
    <LangID ID="Download_Failed_Main_Text" Text="軟體下載失敗。\n要重試嗎？"/>
    <LangID ID="Help_Headline" Text="使用者指南"/>
    <LangID ID="IP_Address_Main_Text" Text="IP address:"/>
    <LangID ID="IVI_Active_Status" Text="音訊輸出至汽車"/>
    <LangID ID="IVI_Delete_Confirm" Text="確定要刪除\n{0} 嗎？\n附註：音訊輸出至汽車喇叭不再可用。"/>
    <LangID ID="IVI_Headline" Text="音訊輸出至汽車"/>
    <LangID ID="IVI_Main_Text" Text="請選擇螢幕名稱作為視聽娛樂系統上的音訊來源。\n最大值由視聽娛樂系統的主控音量確定。"/>
    <LangID ID="IVI_Pairing_Failed" Text="配對失敗。\n請稍後再試。"/>
    <LangID ID="IVI_Pairing_Headline" Text="音訊輸出至汽車"/>
    <LangID ID="IVI_Pairing_In_Progress" Text="配對中..."/>
    <LangID ID="IVI_Pairing_Search" Text="正在搜尋..."/>
    <LangID ID="IVI_Sync_Complete" Text="音訊同步完成。"/>
    <LangID ID="IVI_Sync_Error" Text="發生錯誤。\n無法同步音訊。\n請稍後再試。"/>
    <LangID ID="IVI_Sync_In_Progress" Text="同步中...\n{0}%"/>
    <LangID ID="IVI_Sync_Main_Text" Text="選擇螢幕名稱作為\n視聽娛樂系統上的\n藍牙音訊來源。\n檢查音量並\n減少背景雜訊。\n在系統就緒時\n按 [開始]。"/>
    <LangID ID="Install_Active_Headline" Text="訊息"/>
    <LangID ID="Install_Active_Main_Text" Text="正在安裝更新\n{0}% 完成。\n\n請確保車輛開啟，直到更新完成。\n\n系統在安裝完成後將會重啟。"/>
    <LangID ID="Install_Available_Headline" Text="軟體更新"/>
    <LangID ID="Install_Available_Main_Text" Text="軟體安裝可用。\n要立即安裝嗎？\n\n在更新過程中，將無法操作系統。"/>
    <LangID ID="Install_Delete_Headline" Text="軟體更新"/>
    <LangID ID="Install_Delete_Main_Text" Text="要安裝或刪除更新嗎？\n\n在軟體更新過程中，將無法操作系統。"/>
    <LangID ID="Install_Failed_Headline" Text="軟體更新"/>
    <LangID ID="Install_Failed_Main_Text" Text="軟體更新失敗。\n要重試嗎？"/>
    <LangID ID="Install_Successful_Headline" Text="軟體更新"/>
    <LangID ID="Install_Successful_Main_Text" Text="安裝成功。\n軟體已更新。"/>
    <LangID ID="Language_Arabic" Text="العربية"/>
    <LangID ID="Language_Cantonese" Text="繁體中文"/>
    <LangID ID="Language_Chinese" Text="简体中文"/>
    <LangID ID="Language_Czech" Text="Čeština"/>
    <LangID ID="Language_Danish" Text="Dansk"/>
    <LangID ID="Language_Dutch" Text="Nederlands"/>
    <LangID ID="Language_English_UK" Text="English (UK)"/>
    <LangID ID="Language_English_US" Text="English (US)"/>
    <LangID ID="Language_French" Text="Français"/>
    <LangID ID="Language_French_Can" Text="Français (Canada)"/>
    <LangID ID="Language_German" Text="Deutsch"/>
    <LangID ID="Language_Greek" Text="Ελληνικά"/>
    <LangID ID="Language_Headline" Text="語言 (Language)"/>
    <LangID ID="Language_Hungarian" Text="Magyar"/>
    <LangID ID="Language_Italian" Text="Italiano"/>
    <LangID ID="Language_Japanese" Text="日本語"/>
    <LangID ID="Language_Korean" Text="한국어"/>
    <LangID ID="Language_Norwegian" Text="Norsk"/>
    <LangID ID="Language_Polish" Text="Polski"/>
    <LangID ID="Language_Port_Br" Text="Português (Brasil)"/>
    <LangID ID="Language_Portuguese" Text="Português"/>
    <LangID ID="Language_Preview_Arabic" Text="العربية"/>
    <LangID ID="Language_Preview_Cantonese" Text="繁體中文"/>
    <LangID ID="Language_Preview_Chinese" Text="简体中文"/>
    <LangID ID="Language_Preview_Czech" Text="Čeština"/>
    <LangID ID="Language_Preview_Danish" Text="Dansk"/>
    <LangID ID="Language_Preview_Dutch" Text="Nederlands"/>
    <LangID ID="Language_Preview_English_UK" Text="English (UK)"/>
    <LangID ID="Language_Preview_English_US" Text="English (US)"/>
    <LangID ID="Language_Preview_French" Text="Français"/>
    <LangID ID="Language_Preview_French_Can" Text="Français (Canada)"/>
    <LangID ID="Language_Preview_German" Text="Deutsch"/>
    <LangID ID="Language_Preview_Greek" Text="Ελληνικά"/>
    <LangID ID="Language_Preview_Hungarian" Text="Magyar"/>
    <LangID ID="Language_Preview_Italian" Text="Italiano"/>
    <LangID ID="Language_Preview_Japanese" Text="日本語"/>
    <LangID ID="Language_Preview_Korean" Text="한국어"/>
    <LangID ID="Language_Preview_Norwegian" Text="Norsk"/>
    <LangID ID="Language_Preview_Polish" Text="Polski"/>
    <LangID ID="Language_Preview_Port_Br" Text="Português (Brasil)"/>
    <LangID ID="Language_Preview_Portuguese" Text="Português"/>
    <LangID ID="Language_Preview_Romanian" Text="Română"/>
    <LangID ID="Language_Preview_Russian" Text="Русский"/>
    <LangID ID="Language_Preview_Spanish" Text="Español"/>
    <LangID ID="Language_Preview_Spanish_US" Text="Español (México)"/>
    <LangID ID="Language_Preview_Swedish" Text="Svenska"/>
    <LangID ID="Language_Preview_Taiwanese" Text="繁體中文 (台灣)"/>
    <LangID ID="Language_Preview_Turkish" Text="Türkçe"/>
    <LangID ID="Language_Romanian" Text="Română"/>
    <LangID ID="Language_Russian" Text="Русский"/>
    <LangID ID="Language_Spanish" Text="Español"/>
    <LangID ID="Language_Spanish_US" Text="Español (México)"/>
    <LangID ID="Language_Swedish" Text="Svenska"/>
    <LangID ID="Language_Taiwanese" Text="繁體中文 (台灣)"/>
    <LangID ID="Language_Turkish" Text="Türkçe"/>
    <LangID ID="Legal_Info_Headline" Text="Legal information and privacy policy"/>
    <LangID ID="MCU_Version_Main_Text" Text="MCU version:"/>
    <LangID ID="Max_Volume_Notification" Text="螢幕音量設定為最大值。\n增大您的視聽娛樂系統音量。"/>
    <LangID ID="Memory_Usage_Main_Text" Text="Memory usage:"/>
    <LangID ID="Menu_Download_Active" Text="取消下載"/>
    <LangID ID="Menu_Download_Active_Preview" Text="{0}%"/>
    <LangID ID="Menu_Help_Crosslink" Text="選擇 <span id=\"text_highlight\">[交叉連結]</span> 可檢視隨附螢幕上\n目前顯示的內容。附註：如果\n在使用音訊分享時選擇交叉連結，\n則音訊與音量控制無法使用。"/>
    <LangID ID="Menu_Help_HDMI" Text="連線了相容裝置時，可從 HDMI 來源\n播放內容。\n附註：如果選擇時 HDMI 裝置上未播放\n內容，則螢幕顯示空白。"/>
    <LangID ID="Menu_Help_Input" Text="選擇<span id=\"text_highlight\">[輸入]</span>以連線至 Wi-Fi 網路。\n這可讓您透過外部供應商\n串流內容，或者與您的裝置建立\n連線以分享內容。"/>
    <LangID ID="Menu_Help_Intro" Text="Audi Entertainment System 可讓您檢視\n並聆聽透過 Wi-Fi 連線的行動裝置\n或者透過 HDMI 或 USB 連線的相容裝置\n中的內容。"/>
    <LangID ID="Menu_Help_OTA" Text="To discover new features and bug fixes,\ndownload the latest software from the settings menu."/>
    <LangID ID="Menu_Help_Output_SOP1" Text="選擇 <span id=\"text_highlight\">[藍牙]</span> 以連線藍牙耳機\n或者按下音訊分享按鈕以\n傳送音訊輸出至汽車喇叭。\n音訊亦可透過有線耳機使用。"/>
    <LangID ID="Menu_Help_Output_SOP2" Text="選擇 <span id=\"text_highlight\">[藍牙]</span> 以連線藍牙耳機\n或者按下音訊分享按鈕以\n傳送音訊輸出至汽車喇叭。\n音訊亦可透過有線耳機使用。"/>
    <LangID ID="Menu_Help_Source" Text="選擇 <span id=\"text_highlight\">[來源]</span> 以選擇您想要的內容。\n您可以從顯示的清單中選擇服務，\n以檢視來自外部供應商的內容。\n亦可在此功能表中重設瀏覽器。"/>
    <LangID ID="Menu_Help_USB" Text="在使用 Audi Entertainment Control\napp 時，可透過 USB 從相容的\n裝置播放媒體。"/>
    <LangID ID="Menu_Install_Update" Text="安裝更新"/>
    <LangID ID="Menu_Legal_About_Us" Text="About us"/>
    <LangID ID="Menu_Legal_Open_Source" Text="Open source declaration"/>
    <LangID ID="Menu_Legal_Privacy_Policy" Text="Privacy policy"/>
    <LangID ID="Menu_Settings_Acoustic_Feedback" Text="聽覺回饋"/>
    <LangID ID="Menu_Settings_Audio_Sync" Text="音訊同步"/>
    <LangID ID="Menu_Settings_Brightness_Persistence" Text="亮度持久性"/>
    <LangID ID="Menu_Settings_Connection_Assistant" Text="連線助理"/>
    <LangID ID="Menu_Settings_IVI_Pairing" Text="音訊輸出至汽車"/>
    <LangID ID="Menu_Settings_Language" Text="語言 (Language)"/>
    <LangID ID="Menu_Settings_Legal_Info" Text="Legal information and privacy policy"/>
    <LangID ID="Menu_Settings_Screen_Off" Text="關閉螢幕"/>
    <LangID ID="Menu_Settings_Screen_Timeout" Text="螢幕逾時"/>
    <LangID ID="Menu_Settings_Software" Text="軟體"/>
    <LangID ID="Menu_Settings_Volume_Persistence" Text="音量持久性"/>
    <LangID ID="Menu_Software_Analytics" Text="分析回饋"/>
    <LangID ID="Menu_Software_Reset" Text="還原出廠設定"/>
    <LangID ID="Menu_Software_Update" Text="檢查更新"/>
    <LangID ID="Menu_Software_Update_Check" Text="正在檢查更新..."/>
    <LangID ID="Menu_Software_Version" Text="軟體資訊"/>
    <LangID ID="Network_Search_Main_Text" Text="正在搜尋..."/>
    <LangID ID="No_Connection_Status" Text="未連接"/>
    <LangID ID="No_Device_Status" Text="未連接"/>
    <LangID ID="No_Devices_Main_Text" Text="找不到裝置"/>
    <LangID ID="No_Updates_Headline" Text="軟體更新"/>
    <LangID ID="No_Updates_Main_Text" Text="無更新可用。"/>
    <LangID ID="Notification_Bluetooth_Unavailable" Text="藍牙目前無法使用"/>
    <LangID ID="Notification_Brightness_Unavailable" Text="亮度控制目前無法使用"/>
    <LangID ID="Notification_Child_Lock_Unavailable" Text="童鎖目前無法使用"/>
    <LangID ID="Notification_Connecting" Text="連線中..."/>
    <LangID ID="Notification_Crosslink_Unavailable" Text="交叉連結目前無法使用"/>
    <LangID ID="Notification_Error_Reconnect" Text="連線遺失。正在嘗試重新連線..."/>
    <LangID ID="Notification_Full_Screen_Unavailable" Text="全螢幕模式目前無法使用"/>
    <LangID ID="Notification_HDMI_Unavailable" Text="HDMI 目前無法使用"/>
    <LangID ID="Notification_Help_Unavailable" Text="使用者指南目前無法使用"/>
    <LangID ID="Notification_IVI_Unavailable" Text="音訊分享目前無法使用"/>
    <LangID ID="Notification_Initialising" Text="初始化中..."/>
    <LangID ID="Notification_Mute_Unavailable" Text="靜音目前無法使用"/>
    <LangID ID="Notification_OTT_Unavailable" Text="外部內容供應商無法使用"/>
    <LangID ID="Notification_Quick_Menu_Unavailable" Text="快速功能表目前無法使用"/>
    <LangID ID="Notification_SOP1_Funcion_Unavailable" Text="此功能目前無法使用"/>
    <LangID ID="Notification_Screen_Unavailable" Text="螢幕目前無法使用"/>
    <LangID ID="Notification_Temperature" Text="螢幕溫度太高。系統很快就會關閉，以避免損壞。"/>
    <LangID ID="Notification_Volume_Unavailable" Text="音量控制目前無法使用"/>
    <LangID ID="Notification_WiFi_Unavailable" Text="Wi-Fi 目前無法使用"/>
    <LangID ID="PIN_Entry_Help_Text" Text="輸入 PIN 碼"/>
    <LangID ID="PIN_Entry_Main_Text" Text="請輸入\n藍牙裝置\n的 PIN。"/>
    <LangID ID="Pairing_Failed_Headline" Text="藍牙"/>
    <LangID ID="Pairing_Failed_Main_Text" Text="連線失敗。\n請稍後再試。"/>
    <LangID ID="Pairing_Failed_Wrong_PIN_Headline" Text="藍牙"/>
    <LangID ID="Pairing_Failed_Wrong_PIN_Main_Text" Text="連線失敗。\n請稍後再試。"/>
    <LangID ID="Password_Speller_Help_Text" Text="輸入密碼"/>
    <LangID ID="Quick_Menu_Full_Screen" Text="全螢幕"/>
    <LangID ID="Quick_Menu_Help" Text="使用者指南"/>
    <LangID ID="Quick_Menu_Screen_Off" Text="關閉螢幕"/>
    <LangID ID="Quick_Menu_Settings" Text="設定"/>
    <LangID ID="Quick_Menu_Source" Text="媒體源"/>
    <LangID ID="RSE_Version_Main_Text" Text="RSE version:"/>
    <LangID ID="Remote_Crosslink_Notification" Text="來源已變更 - 交叉連結作用中"/>
    <LangID ID="Remote_HDMI_Notification" Text="來源已變更 - HDMI 作用中"/>
    <LangID ID="Rename_Device_Headline" Text="重新命名裝置"/>
    <LangID ID="Reset_Browser_Headline" Text="重設瀏覽器"/>
    <LangID ID="Reset_Browser_Main_Text" Text="確定要重設瀏覽器嗎？\n所有帳戶資訊將會遺失，\n且您需要重新登入。"/>
    <LangID ID="Run_Time_Main_Text" Text="Running time:"/>
    <LangID ID="Screen_Off_Notification" Text="請輕按螢幕以開啟"/>
    <LangID ID="Screen_Timeout_Headline" Text="螢幕逾時"/>
    <LangID ID="Settings_Headline" Text="設定"/>
    <LangID ID="Shutting_Down_Notification" Text="系統關機中..."/>
    <LangID ID="Software_Reset_Headline" Text="還原出廠設定"/>
    <LangID ID="Software_Reset_Main_Text" Text="在還原系統後，所有設定將會\n重設。所有個人資料，包括儲存的\n網路、藍牙裝置及密碼，\n皆會刪除。\n\n確定要重設嗎？"/>
    <LangID ID="Software_Reset_Successful_Headline" Text="還原出廠設定"/>
    <LangID ID="Software_Reset_Successful_Main_Text" Text="原廠設定已還原。\n系統將很快重啟。"/>
    <LangID ID="Software_Update_Headline" Text="軟體"/>
    <LangID ID="Software_Version_Headline" Text="軟體資訊"/>
    <LangID ID="Software_Version_Main_Text" Text="軟體版本"/>
    <LangID ID="Source_Device_Menu_Text" Text="來自裝置的內容"/>
    <LangID ID="Source_HDMI_Menu_Text" Text="HDMI"/>
    <LangID ID="Source_Headline" Text="媒體源"/>
    <LangID ID="Source_Netflix_Menu_Text" Text="Netflix"/>
    <LangID ID="Source_Screensaver_Menu_Text" Text="螢幕保護裝置"/>
    <LangID ID="Timeout_Option_1" Text="永不"/>
    <LangID ID="Timeout_Option_2" Text="30 秒"/>
    <LangID ID="Timeout_Option_3" Text="1 分鐘"/>
    <LangID ID="Timeout_Option_4" Text="5 分鐘"/>
    <LangID ID="Timeout_Option_5" Text="10 分鐘"/>
    <LangID ID="Timeout_Option_6" Text="30 分鐘"/>
    <LangID ID="Timeout_Preview_Option_1" Text="永不"/>
    <LangID ID="Timeout_Preview_Option_2" Text="30 秒"/>
    <LangID ID="Timeout_Preview_Option_3" Text="1 分鐘"/>
    <LangID ID="Timeout_Preview_Option_4" Text="5 分鐘"/>
    <LangID ID="Timeout_Preview_Option_5" Text="10 分鐘"/>
    <LangID ID="Timeout_Preview_Option_6" Text="30 分鐘"/>
    <LangID ID="Update_Available_Headline" Text="軟體更新"/>
    <LangID ID="Update_Available_Main_Text" Text="軟體更新可用。\n立即下載？"/>
    <LangID ID="Update_Unavailable_Headline" Text="軟體更新"/>
    <LangID ID="Update_Unavailable_Main_Text" Text="無法檢查更新。\n請稍後再試。"/>
    <LangID ID="Use_Extension_Headline" Text="訊息"/>
    <LangID ID="Use_Extension_Main_Text_PL" Text="Audi Entertainment System\n將在 {0} 秒後關機。\n按 [確定] 延長使用。"/>
    <LangID ID="Use_Extension_Main_Text_SG" Text="Audi Entertainment System\n將在 {0} 秒後關機。\n按 [確定] 延長使用。"/>
    <LangID ID="Wi-Fi_Status" Text="WI-FI"/>
    <LangID ID="WiFi_Headline" Text="Wi-Fi"/>
</LangDef>
`



replacer = function(match, p1, p2, p3, offset, string){

   match = match.replace(/"/g,'&quot;')
   match = match.replace(/'/g,'&apos;')
   match = match.replace(/</g,'&lt;')
   match = match.replace(/>/g,'&gt;')
   match = match.replace(/&/g,'&amp;')
   //console.log(p1)
   return match
}


xmlString3 = xmlString3.replace(/\n/g,'\n')



let afterReplace = xmlString3.replace(/(?<=Text\=\")(.*?)(?="\/\>)/g,replacer)
afterReplace  = afterReplace.replace(/(?<=\>)(.*?)(?=\<)/g,'\n')
afterReplace = afterReplace.replace(/<\/LangDef>\n/g,'</LangDef>')
//console.log(afterReplace)

//console.log( JSON.stringify( JSON.parse( convert.xml2json(afterReplace)),null,'\t') )



const BYOC = './BYOC'
const newfolder = './rawjson'
fs.readdir(BYOC, (err, files) => {
   files.forEach(file => {
     //console.log(path.basename(file,'.xml'));//去掉副檔名
      const newjsonfilename = path.basename(file,'.xml')+'.json'
      let tmp = fs.readFileSync( path.join(BYOC,file) ,'utf-8')
      tmp = tmp.replace(/(?<=Text\=\")(.*?)(?="\/\>)/g,replacer)
      tmp  = tmp.replace(/(?<=\>)(.*?)(?=\<)/g,'\n')
      tmp = tmp.replace(/<\/LangDef>\n/g,'</LangDef>')



      // console.log(file)
      //console.log(tmp)
      //console.log( JSON.stringify( JSON.parse( convert.xml2json(tmp)),null,'\t') )
      //console.log( JSON.stringify( JSON.parse( convert.xml2json(tmp)),null,'\t') )
      fs.writeFileSync(path.join(newfolder,newjsonfilename), JSON.stringify( JSON.parse( convert.xml2json(tmp)),null,'\t')  )
   });
 });
