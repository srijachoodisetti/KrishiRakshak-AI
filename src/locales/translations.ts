export type Language = 'en' | 'te' | 'hi'

export interface WeatherTranslations {
  dashboard: {
    badge: string
    title: string
    description: string
    loadingTitle: string
    loadingDesc: string
    errorHeader: string
    retryButton: string
    invalidCoordinates: string
    fetchErrorGeneric: string
    apiServerError: string
    apiTimeoutError: string
    offlineError: string
  }
  location: {
    badge: string
    title: string
    subtitle: string
    useGpsButton: string
    gpsLocating: string
    hideMapButton: string
    showMapButton: string
    mapInstruction: string
    coordinatesLabel: string
    confirmButton: string
    confirmedButton: string
    activeLocationLabel: string
    noLocationYet: string
    gpsLocatedName: string
    mapSelectedName: string
    gpsNoticeTitle: string
    gpsErrorPermission: string
    gpsErrorUnavailable: string
    gpsErrorTimeout: string
    gpsErrorUnsupported: string
  }
  current: {
    locationLabel: string
    lastUpdated: string
    feelsLike: string
    feelsLikeShort: string
    humidity: string
    rainfall: string
    windSpeed: string
    sunrise: string
    sunset: string
    timezoneLabel: string
    temperature: string
  }
  conditions: Record<string, string>
  forecast: {
    badge: string
    title: string
    subtitle: string
    tabHourly: string
    tabDaily: string
    hourlyChartTitle: string
    tempLegend: string
    rainLegend: string
    rainChance: string
    days: Record<string, string>
  }
  risk: {
    badge: string
    title: string
    subtitle: string
    overallStatusLabel: string
    severityLow: string
    severityModerate: string
    severityHigh: string
    metricLabel: string
    thresholdLabel: string
    advisoryHeader: string
    disclaimerText: string
    riskSummaryLow: string
    riskSummaryModerate: string
    riskSummaryHigh: string
    riskRainHeavyTitle: string
    riskRainHeavyDesc: string
    riskRainHeavyAdv: string
    riskRainModerateTitle: string
    riskRainModerateDesc: string
    riskRainModerateAdv: string
    riskRainLowTitle: string
    riskRainLowDesc: string
    riskRainLowAdv: string
    riskTempHighTitle: string
    riskTempHighDesc: string
    riskTempHighAdv: string
    riskTempModerateTitle: string
    riskTempModerateDesc: string
    riskTempModerateAdv: string
    riskTempLowTitle: string
    riskTempLowDesc: string
    riskTempLowAdv: string
    riskHumidityHighTitle: string
    riskHumidityHighDesc: string
    riskHumidityHighAdv: string
    riskHumidityModerateTitle: string
    riskHumidityModerateDesc: string
    riskHumidityModerateAdv: string
    riskHumidityLowTitle: string
    riskHumidityLowDesc: string
    riskHumidityLowAdv: string
    riskWindHighTitle: string
    riskWindHighDesc: string
    riskWindHighAdv: string
    riskWindModerateTitle: string
    riskWindModerateDesc: string
    riskWindModerateAdv: string
    riskWindLowTitle: string
    riskWindLowDesc: string
    riskWindLowAdv: string
  }
}

export interface AuthTranslations {
  loginTitle: string
  loginSubtitle: string
  registerTitle: string
  registerSubtitle: string
  forgotPasswordTitle: string
  forgotPasswordSubtitle: string
  resetPasswordTitle: string
  resetPasswordSubtitle: string
  fullName: string
  fullNamePlaceholder: string
  email: string
  emailPlaceholder: string
  phone: string
  phonePlaceholder: string
  password: string
  passwordPlaceholder: string
  confirmPassword: string
  confirmPasswordPlaceholder: string
  newPassword: string
  newPasswordPlaceholder: string
  village: string
  villagePlaceholder: string
  district: string
  districtPlaceholder: string
  state: string
  statePlaceholder: string
  rememberMe: string
  forgotPasswordLink: string
  loginButton: string
  registerButton: string
  sendResetLink: string
  updatePasswordButton: string
  backToLogin: string
  haveAccount: string
  noAccount: string
  registerNow: string
  loginNow: string
  errRequired: string
  errEmail: string
  errPhone: string
  errPasswordMin: string
  errPasswordMatch: string
  errGeneric: string
  regSuccessVerification: string
  resetEmailSent: string
  passwordResetSuccess: string
  signingIn: string
  registering: string
  sending: string
  updating: string
  continueWithGoogle: string
  signUpWithGoogle: string
  orContinueWith: string
}

export interface DashboardTranslations {
  title: string
  welcome: string
  tagline: string
  profileSummary: string
  editProfile: string
  emailLabel: string
  phoneLabel: string
  locationLabel: string
  memberSince: string
  weatherCardTitle: string
  weatherCardDesc: string
  viewWeather: string
  cropDoctorTitle: string
  cropDoctorDesc: string
  startScan: string
  recentActivityTitle: string
  noActivity: string
  logout: string
  quickStatsFarms: string
  quickStatsScans: string
  quickStatsStatus: string
  activeProtection: string
  totalLandArea: string
  activeCrops: string
  emptyFarmTitle: string
  emptyFarmDesc: string
  registerFirstFarm: string
  sidebar: {
    dashboard: string
    myFarm: string
    weather: string
    cropDoctor: string
    cropManagement: string
    farmActivities: string
    profile: string
    settings: string
    logout: string
  }
}

export interface FarmTranslations {
  title: string
  subtitle: string
  registerNewFarm: string
  editFarm: string
  deleteFarm: string
  confirmDeleteTitle: string
  confirmDeleteBody: string
  saveFarm: string
  saving: string
  farmName: string
  farmNamePlaceholder: string
  village: string
  villagePlaceholder: string
  district: string
  districtPlaceholder: string
  state: string
  statePlaceholder: string
  landArea: string
  landAreaPlaceholder: string
  landAreaUnit: string
  soilType: string
  irrigationType: string
  waterSource: string
  waterSourcePlaceholder: string
  description: string
  descriptionPlaceholder: string
  locationCoordinates: string
  latitude: string
  longitude: string
  detectGps: string
  gpsDetecting: string
  pinLocationMap: string
  selectOnMap: string
  emptyTitle: string
  emptyDesc: string
  addFirstFarm: string
  saveSuccess: string
  updateSuccess: string
  deleteSuccess: string
  saveError: string
}

export interface CropManagementTranslations {
  title: string
  subtitle: string
  addCrop: string
  editCrop: string
  deleteCrop: string
  confirmDelete: string
  selectFarm: string
  cropName: string
  cropVariety: string
  sowingDate: string
  expectedHarvestDate: string
  cultivatedArea: string
  growthStage: string
  irrigationMethod: string
  notes: string
  saveCrop: string
  saving: string
  emptyTitle: string
  emptyDesc: string
  addFirstCrop: string
  saveSuccess: string
  deleteSuccess: string
}

export interface ActivityTranslations {
  title: string
  subtitle: string
  logActivity: string
  activityType: string
  activityDate: string
  selectFarm: string
  selectCropOptional: string
  description: string
  descriptionPlaceholder: string
  notes: string
  notesPlaceholder: string
  saveActivity: string
  saving: string
  emptyTitle: string
  emptyDesc: string
  logFirstActivity: string
  saveSuccess: string
  deleteSuccess: string
}

export interface ProfileTranslations {
  title: string
  subtitle: string
  accountInfo: string
  saveButton: string
  saving: string
  saveSuccess: string
  saveError: string
  backToDashboard: string
}

export interface CropDoctorPageTranslations {
  badge: string
  title: string
  subtitle: string
  guideButton: string
  guideTitle: string
  guideDesc: string
  guideNote: string
  errorTitle: string
  uploadCardTitle: string
  uploadCardDesc: string
  changePhoto: string
  dropzonePrompt: string
  dropzoneHint: string
  runDiagnosisButton: string
  analyzingButton: string
  guidelinesTitle: string
  guideline1: string
  guideline2: string
  guideline3: string
  liveIntelTitle: string
  defaultAssessment: string
  statusCompleted: string
  statusUncertain: string
  statusAwaiting: string
  taskATitle: string
  scientificNamePrefix: string
  observedTraitsTitle: string
  taskBTitle: string
  healthyCropTitle: string
  observableSymptomsTitle: string
  uncertaintyTitle: string
  uncertaintyMessage: string
  guidanceTitle: string
  disclaimerPrefix: string
  emptyStateTitle: string
  emptyStateDesc: string
  analyzingTitle: string
  analyzingDesc: string
  translatingNotice: string
  translationFailedNotice: string
  confidenceHigh: string
  confidenceModerate: string
  confidenceLow: string
  severityLabel: string
  severityLow: string
  severityMedium: string
  severityHigh: string
  organicTreatmentsTitle: string
  chemicalTreatmentsTitle: string
  preventionTitle: string
  expertConsultTitle: string
  expertConsultDesc: string
  historyTabTitle: string
  liveDiagnosisTabTitle: string
  historyEmptyTitle: string
  historyEmptyDesc: string
  saveToHistoryButton: string
  savedToHistoryNotice: string
  deleteHistoryConfirm: string
  historyDetailsTitle: string
  historyDateLabel: string
  historySymptomsLabel: string
  historyRecommendationsLabel: string
  historyConfidenceLabel: string
  historySeverityLabel: string
  viewDetailsButton: string
  closeModalButton: string
  deleteRecordTitle: string
  deleteButton: string
  cancelButton: string
  stepUploading: string
  stepIdentifying: string
  stepAnalyzing: string
  stepRecommendations: string
  stepCompleting: string
  advisorBadge: string
  advisorTitle: string
  advisorSubtitle: string
  likelyCauseTitle: string
  immediateActionsTitle: string
  recoveryPlanTitle: string
  followUp3dLabel: string
  followUp7dLabel: string
  logTreatmentButton: string
  treatmentModalTitle: string
  treatmentNameLabel: string
  treatmentTypeLabel: string
  applicationDateLabel: string
  dosageOrMethodLabel: string
  observationsLabel: string
  saveTreatmentButton: string
  treatmentSuccessNotice: string
  treatmentErrorNotice: string
  treatmentWarningCropMismatch: string
  treatmentWarningCropBelongsToOtherFarm: string
  chemicalDisclaimerWarning: string
  treatmentSelectFarm: string
  treatmentAssociatedCrop: string
  treatmentNoLinkedCrop: string
  treatmentTypeOrganic: string
  treatmentTypeChemical: string
  treatmentTypeCultural: string
  treatmentTypeOther: string
  treatmentStatusMonitoring: string
  treatmentStatusRecovering: string
  treatmentStatusResolved: string
  treatmentStatusNeedsFollowUp: string
  treatmentStatusImproving: string
  treatmentStatusUnchanged: string
  treatmentStatusWorsening: string
  treatmentHistoryTabTitle: string
  treatmentHistoryEmptyTitle: string
  treatmentHistoryEmptyDesc: string
  updateRecoveryStatusTitle: string
  saveStatusButton: string
  followUpCheckpointsTitle: string
  diagnosisLinkedBadge: string
  cropMatchedBadge: string
  generalFieldLabel: string
  errInvalidFile: string
  errFileLimit: string
  errGeneric: string
}

export interface TranslationDictionary {
  nav: {
    brandName: string
    brandSubtitle: string
    home: string
    features: string
    weather: string
    howItWorks: string
    about: string
    currentLanguageLabel: string
    login: string
    register: string
    dashboard: string
    profile: string
    logout: string
    getStarted: string
    toggleMenuAria: string
  }
  hero: {
    badge: string
    title: string
    description: string
    getStarted: string
    exploreFeatures: string
    cropAssessmentBadge: string
    weatherIntelligenceBadge: string
    floatingDoctorTitle: string
    floatingDoctorDesc: string
    floatingSmartTitle: string
    floatingSmartDesc: string
    heroImageAlt: string
  }
  quickHighlights: Array<{
    title: string
    desc: string
  }>
  featuresSection: {
    badge: string
    title: string
    description: string
    cards: Array<{
      title: string
      description: string
    }>
  }
  weather: WeatherTranslations
  auth: AuthTranslations
  dashboard: DashboardTranslations
  farm: FarmTranslations
  crops: CropManagementTranslations
  activities: ActivityTranslations
  profile: ProfileTranslations
  cropDoctor: CropDoctorPageTranslations
  aboutSection: {
    badge: string
    title: string
    description: string
    missionTitle: string
    missionDesc: string
    decisionTitle: string
    decisionDesc: string
    languagesTitle: string
    languagesDesc: string
  }
  howItWorksSection: {
    badge: string
    title: string
    description: string
    stepPrefix: string
    steps: Array<{
      number: string
      title: string
      description: string
    }>
  }
  cropDoctorSection: {
    badge: string
    title: string
    description: string
    checklist: string[]
    ctaButton: string
    reportTag: string
    reportTitle: string
    sampleBadge: string
    reportImageAlt: string
    issueLabel: string
    issueTitle: string
    issueDesc: string
    recommendationsTitle: string
    recommendations: string[]
    disclaimer: string
  }
  footer: {
    brandName: string
    tagline: string
    quickLinksTitle: string
    quickLinks: {
      home: string
      features: string
      weather: string
      howItWorks: string
      about: string
      dashboard: string
      login: string
    }
    platformTitle: string
    platformItems: string[]
    copyright: string
  }
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      brandName: 'KrishiRakshak',
      brandSubtitle: 'AI · SMART AGRICULTURE',
      home: 'Home',
      features: 'Features',
      weather: 'Weather',
      howItWorks: 'How It Works',
      about: 'About',
      currentLanguageLabel: 'English',
      login: 'Login',
      register: 'Register',
      dashboard: 'Dashboard',
      profile: 'Profile',
      logout: 'Logout',
      getStarted: 'Get Started',
      toggleMenuAria: 'Toggle navigation',
    },
    hero: {
      badge: 'AI POWERED AGRICULTURE',
      title: 'Smart Farming. Early Warnings. Better Harvests.',
      description:
        'Protect your crops with AI-powered disease assessment, real-time weather intelligence and personalized agricultural guidance in your language.',
      getStarted: 'Get Started',
      exploreFeatures: 'Explore Features',
      cropAssessmentBadge: 'AI Crop Assessment',
      weatherIntelligenceBadge: 'Weather Intelligence',
      floatingDoctorTitle: 'AI Crop Doctor',
      floatingDoctorDesc: 'Intelligent crop assessment',
      floatingSmartTitle: 'Smart Farming',
      floatingSmartDesc: 'Better crop decisions',
      heroImageAlt: 'Agricultural fields',
    },
    quickHighlights: [
      {
        title: 'AI Crop Doctor',
        desc: 'Identify possible crop problems',
      },
      {
        title: 'Weather Intelligence',
        desc: 'Monitor weather conditions',
      },
      {
        title: 'Crop Risk Alerts',
        desc: 'Understand potential crop risks',
      },
    ],
    featuresSection: {
      badge: 'Our Features',
      title: 'Everything Your Farm Needs, In One Place',
      description:
        'Intelligent agricultural tools designed to help farmers monitor crops, understand risks and make better decisions.',
      cards: [
        {
          title: 'AI Crop Doctor',
          description:
            'Analyze crop leaf photographs and identify possible diseases and visible symptoms.',
        },
        {
          title: 'Weather Intelligence',
          description:
            'Monitor current weather, rainfall, humidity and upcoming forecasts.',
        },
        {
          title: 'Crop Risk Assessment',
          description:
            'Understand potential weather-related crop risks with transparent assessments.',
        },
        {
          title: 'AI Farmer Assistant',
          description:
            'Get agricultural guidance through an assistant supporting Telugu and English.',
        },
        {
          title: 'Farm Management',
          description:
            'Organize farms, crop varieties, planting dates and growth stages.',
        },
        {
          title: 'Scan History',
          description:
            'Review previous crop assessments and recommendations in one place.',
        },
      ],
    },
    weather: {
      dashboard: {
        badge: 'Weather Intelligence',
        title: 'Hyperlocal Weather & Early Crop Risk Alerts',
        description:
          'Real-time meteorological insights powered by Open-Meteo and transparent risk thresholds to help you schedule irrigation, spraying and harvesting.',
        loadingTitle: 'Fetching Farm Weather...',
        loadingDesc: 'Connecting to Open-Meteo forecast models for your exact geographic coordinates.',
        errorHeader: 'Unable to Load Weather Data',
        retryButton: 'Try Again',
        invalidCoordinates: 'Invalid latitude or longitude coordinates provided.',
        fetchErrorGeneric: 'Failed to retrieve forecast data. Please check your network connection.',
        apiServerError: 'Open-Meteo forecast server is temporarily unavailable. Please retry in a few moments.',
        apiTimeoutError: 'Weather request timed out. Please check your connection and retry.',
        offlineError: 'You appear to be offline. Please reconnect to the internet.',
      },
      location: {
        badge: 'Farm Location',
        title: 'Select Your Farm Coordinates',
        subtitle: 'Use automatic device GPS or click anywhere on the interactive map to inspect weather for your specific plot.',
        useGpsButton: 'Use Device GPS',
        gpsLocating: 'Locating Farm...',
        hideMapButton: 'Hide Map',
        showMapButton: 'Show Map',
        mapInstruction: 'Click anywhere on the map to place your farm pin.',
        coordinatesLabel: 'Selected Coordinates',
        confirmButton: 'Confirm Location',
        confirmedButton: 'Location Confirmed',
        activeLocationLabel: 'Active Farm',
        noLocationYet: 'No location selected yet',
        gpsLocatedName: 'GPS Device Location',
        mapSelectedName: 'Interactive Map Plot',
        gpsNoticeTitle: 'Location Permission',
        gpsErrorPermission: 'Location access was denied. Please enable permission in your browser or select your farm manually on the map.',
        gpsErrorUnavailable: 'Your device location is currently unavailable. Please pick your farm on the map below.',
        gpsErrorTimeout: 'Location detection request timed out. Please try again.',
        gpsErrorUnsupported: 'Geolocation is not supported by your browser. Please use the interactive map.',
      },
      current: {
        locationLabel: 'Farm Coordinates',
        lastUpdated: 'Updated',
        feelsLike: 'Feels like',
        feelsLikeShort: 'Feels like',
        humidity: 'Humidity',
        rainfall: 'Rainfall',
        windSpeed: 'Wind Speed',
        sunrise: 'Sunrise',
        sunset: 'Sunset',
        timezoneLabel: 'Timezone',
        temperature: 'Temperature',
      },
      conditions: {
        clearSky: 'Clear Sky',
        mainlyClear: 'Mainly Clear',
        partlyCloudy: 'Partly Cloudy',
        overcast: 'Overcast',
        fog: 'Foggy Conditions',
        drizzle: 'Light Drizzle',
        freezingDrizzle: 'Freezing Drizzle',
        slightRain: 'Slight Rain',
        moderateRain: 'Moderate Rain',
        heavyRain: 'Heavy Rain',
        freezingRain: 'Freezing Rain',
        snow: 'Snowfall',
        rainShowers: 'Rain Showers',
        violentRainShowers: 'Violent Rain Showers',
        snowShowers: 'Snow Showers',
        thunderstorm: 'Thunderstorm',
        thunderstormWithHail: 'Thunderstorm with Hail',
      },
      forecast: {
        badge: 'Forecast Intelligence',
        title: 'Upcoming 24-Hour & 7-Day Outlook',
        subtitle: 'Hourly temperature curves and 7-day outlook to plan ahead with confidence.',
        tabHourly: '24-Hour Hourly',
        tabDaily: '7-Day Outlook',
        hourlyChartTitle: '24-Hour Temperature & Rain Probability Curve',
        tempLegend: 'Temperature',
        rainLegend: 'Rain Probability',
        rainChance: 'Rain Chance',
        days: {
          today: 'Today',
          tomorrow: 'Tomorrow',
          sunday: 'Sun',
          monday: 'Mon',
          tuesday: 'Tue',
          wednesday: 'Wed',
          thursday: 'Thu',
          friday: 'Fri',
          saturday: 'Sat',
        },
      },
      risk: {
        badge: 'Preliminary Risk Engine',
        title: 'Crop Weather Risk Indicators',
        subtitle: 'Automated meteorological threshold evaluation for major environmental stress factors.',
        overallStatusLabel: 'Overall Status',
        severityLow: 'Favorable (Low Risk)',
        severityModerate: 'Caution (Moderate Risk)',
        severityHigh: 'Alert (High Risk)',
        metricLabel: 'Forecast Metric',
        thresholdLabel: 'Scientific Threshold',
        advisoryHeader: 'Preliminary Farm Advisory',
        disclaimerText: 'Notice: These are preliminary weather indicators based on meteorological thresholds, not guaranteed crop-loss predictions. Actual crop response depends on variety, growth stage, soil type, and farm management practices.',
        riskSummaryLow: 'Current and forecast conditions are generally favorable for standard agricultural activities.',
        riskSummaryModerate: 'Elevated weather conditions detected. Monitor field drainage, moisture, and spray timing.',
        riskSummaryHigh: 'Active weather alert triggers identified. Implement recommended protective measures immediately.',
        riskRainHeavyTitle: 'Heavy Rainfall Warning',
        riskRainHeavyDesc: 'Forecast indicates intense rainfall exceeding 50 mm. Risk of waterlogging, root aeration distress, and soil erosion.',
        riskRainHeavyAdv: 'Clear field drainage channels. Postpone fertilizer broadcasting and chemical spraying until soil stabilizes.',
        riskRainModerateTitle: 'Moderate Rain Expected',
        riskRainModerateDesc: 'Moderate showers anticipated. Beneficial for soil moisture, but monitor field retention in low zones.',
        riskRainModerateAdv: 'Inspect field bunds and drainage outlets. Hold off on non-urgent foliar spraying.',
        riskRainLowTitle: 'Normal Rainfall Conditions',
        riskRainLowDesc: 'Light or negligible precipitation forecast. Favorable for routine field operations.',
        riskRainLowAdv: 'Proceed with scheduled irrigation and field activities based on soil moisture.',
        riskTempHighTitle: 'High Temperature Warning',
        riskTempHighDesc: 'Extreme heat stress. High evapotranspiration rate may induce wilting or flower drop.',
        riskTempHighAdv: 'Provide light irrigation during early morning or late evening. Maintain mulch to protect root zones.',
        riskTempModerateTitle: 'Elevated Daytime Temperature',
        riskTempModerateDesc: 'Warm conditions with accelerated moisture depletion in shallow soils.',
        riskTempModerateAdv: 'Monitor soil moisture regularly; irrigate before peak afternoon heat if soil is dry.',
        riskTempLowTitle: 'Favorable Temperature Range',
        riskTempLowDesc: 'Temperature is within the optimal vegetative development range for regional crops.',
        riskTempLowAdv: 'Standard growing conditions. Continue regular crop management practices.',
        riskHumidityHighTitle: 'High Humidity Alert',
        riskHumidityHighDesc: 'Sustained high humidity creates favorable microclimatic conditions for fungal spore germination.',
        riskHumidityHighAdv: 'Ensure crop canopy aeration and weed clearance. Inspect lower leaves for early fungal spotting.',
        riskHumidityModerateTitle: 'Moderate Humidity Level',
        riskHumidityModerateDesc: 'Moderately humid conditions. Observe plant health during continuous cloud cover.',
        riskHumidityModerateAdv: 'Promote good field air circulation. Avoid late-afternoon leaf wetting.',
        riskHumidityLowTitle: 'Normal Humidity Level',
        riskHumidityLowDesc: 'Relative humidity is normal. Low risk of moisture-induced microclimatic disease buildup.',
        riskHumidityLowAdv: 'Dry canopy conditions favorable for general crop health and field spraying.',
        riskWindHighTitle: 'Strong Wind Warning',
        riskWindHighDesc: 'High wind gusts may cause lodging in tall crops (maize, banana, sugarcane) or branch snapping.',
        riskWindHighAdv: 'Provide staking or propping for vulnerable crops. Secure nursery nets and avoid high spraying.',
        riskWindModerateTitle: 'Breezy Wind Conditions',
        riskWindModerateDesc: 'Moderate breeze observed. Chemical spray drift risk during field application.',
        riskWindModerateAdv: 'Postpone herbicide and pesticide spraying until wind calms to prevent chemical drift.',
        riskWindLowTitle: 'Calm Wind Conditions',
        riskWindLowDesc: 'Gentle wind conditions. Minimal physical stress on standing vegetation.',
        riskWindLowAdv: 'Ideal weather window for scheduled foliar sprays and farm machinery operations.',
      },
    },
    auth: {
      loginTitle: 'Farmer Login',
      loginSubtitle: 'Sign in to access your farm intelligence & advisory',
      registerTitle: 'Farmer Registration',
      registerSubtitle: 'Create your account for personalized crop protection',
      forgotPasswordTitle: 'Forgot Password',
      forgotPasswordSubtitle: 'Enter your registered email to receive a recovery link',
      resetPasswordTitle: 'Set New Password',
      resetPasswordSubtitle: 'Enter your new secure password below',
      fullName: 'Full Name',
      fullNamePlaceholder: 'e.g. Ramesh Reddy',
      email: 'Email Address',
      emailPlaceholder: 'farmer@example.com',
      phone: 'Mobile Number',
      phonePlaceholder: '10-digit mobile number',
      password: 'Password',
      passwordPlaceholder: 'At least 6 characters',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Re-enter your password',
      newPassword: 'New Password',
      newPasswordPlaceholder: 'At least 6 characters',
      village: 'Village / Town',
      villagePlaceholder: 'e.g. Gudivada',
      district: 'District',
      districtPlaceholder: 'e.g. Krishna',
      state: 'State',
      statePlaceholder: 'e.g. Andhra Pradesh',
      rememberMe: 'Keep me signed in',
      forgotPasswordLink: 'Forgot password?',
      loginButton: 'Sign In',
      registerButton: 'Create Farmer Account',
      sendResetLink: 'Send Password Reset Link',
      updatePasswordButton: 'Update Password',
      backToLogin: 'Back to Sign In',
      haveAccount: 'Already registered?',
      noAccount: "Don't have an account?",
      registerNow: 'Register here',
      loginNow: 'Sign in here',
      errRequired: 'This field is required',
      errEmail: 'Please enter a valid email address',
      errPhone: 'Please enter a valid 10-digit Indian mobile number',
      errPasswordMin: 'Password must be at least 6 characters',
      errPasswordMatch: 'Passwords do not match',
      errGeneric: 'Authentication failed. Please verify your details.',
      regSuccessVerification: 'Registration successful! A verification email has been sent. Please confirm your email before logging in.',
      resetEmailSent: 'Password recovery email sent. Please check your inbox.',
      passwordResetSuccess: 'Password updated successfully! You can now log in.',
      signingIn: 'Signing in...',
      registering: 'Creating account...',
      sending: 'Sending email...',
      updating: 'Updating...',
      continueWithGoogle: 'Continue with Google',
      signUpWithGoogle: 'Sign up with Google',
      orContinueWith: 'OR CONTINUE WITH',
    },
    dashboard: {
      title: 'Farmer Dashboard',
      welcome: 'Welcome back',
      tagline: 'Your personalized smart agriculture and farm intelligence portal',
      profileSummary: 'Farmer Profile',
      editProfile: 'Edit Profile',
      emailLabel: 'Email',
      phoneLabel: 'Mobile',
      locationLabel: 'Location',
      memberSince: 'Member Since',
      weatherCardTitle: 'Live Farm Weather',
      weatherCardDesc: 'Hyperlocal forecast & environmental risk assessment',
      viewWeather: 'Explore Weather Module',
      cropDoctorTitle: 'AI Crop Doctor',
      cropDoctorDesc: 'Scan leaves to detect visible crop disease symptoms early',
      startScan: 'Open Crop Doctor',
      recentActivityTitle: 'Recent Crop & Farm Activity',
      noActivity: 'No crop scans or farm activities recorded yet.',
      logout: 'Sign Out',
      quickStatsFarms: 'Registered Farms',
      quickStatsScans: 'Crop Health Checks',
      quickStatsStatus: 'Protection Status',
      activeProtection: 'Active',
      totalLandArea: 'Total Cultivated Land',
      activeCrops: 'Active Crops',
      emptyFarmTitle: 'Your farm journey starts here.',
      emptyFarmDesc: 'Register your agricultural plot to unlock tailored weather intelligence, crop tracking, and disease monitoring.',
      registerFirstFarm: 'Register Your First Farm',
      sidebar: {
        dashboard: 'Dashboard',
        myFarm: 'My Farm',
        weather: 'Weather Intelligence',
        cropDoctor: 'AI Crop Doctor',
        cropManagement: 'Crop Management',
        farmActivities: 'Farm Activities',
        profile: 'My Profile',
        settings: 'Settings',
        logout: 'Logout',
      },
    },
    farm: {
      title: 'Farm Management',
      subtitle: 'Register and manage your farm plots and soil specifications',
      registerNewFarm: 'Register New Farm',
      editFarm: 'Edit Farm Details',
      deleteFarm: 'Delete Farm',
      confirmDeleteTitle: 'Delete Farm Record?',
      confirmDeleteBody: 'Are you sure you want to delete this farm? All associated crop records and farm activities will also be removed.',
      saveFarm: 'Save Farm Details',
      saving: 'Saving Farm...',
      farmName: 'Farm Name',
      farmNamePlaceholder: 'e.g. Ganga Agro Fields',
      village: 'Village / Locality',
      villagePlaceholder: 'e.g. Gudivada',
      district: 'District',
      districtPlaceholder: 'e.g. Krishna',
      state: 'State',
      statePlaceholder: 'e.g. Andhra Pradesh',
      landArea: 'Total Land Area',
      landAreaPlaceholder: 'e.g. 5.5',
      landAreaUnit: 'Land Area Unit',
      soilType: 'Soil Type',
      irrigationType: 'Irrigation Type',
      waterSource: 'Main Water Source',
      waterSourcePlaceholder: 'e.g. Deep Borewell & Canal',
      description: 'Farm Description / Notes',
      descriptionPlaceholder: 'Additional notes regarding field topography, elevation, or fencing...',
      locationCoordinates: 'Geographic Farm Coordinates',
      latitude: 'Latitude',
      longitude: 'Longitude',
      detectGps: 'Detect Current Location (GPS)',
      gpsDetecting: 'Locating via GPS...',
      pinLocationMap: 'Select Farm on Map',
      selectOnMap: 'Click anywhere on the map to pin your exact farm coordinates',
      emptyTitle: 'No registered farms yet',
      emptyDesc: 'Add your first farm plot to activate hyperlocal weather forecasts and risk tracking.',
      addFirstFarm: 'Register Your First Farm',
      saveSuccess: 'Farm details saved successfully!',
      updateSuccess: 'Farm details updated successfully!',
      deleteSuccess: 'Farm deleted successfully.',
      saveError: 'Failed to save farm details. Please check the fields and try again.',
    },
    crops: {
      title: 'Crop Management',
      subtitle: 'Track active crop varieties, growth stages, and expected harvests',
      addCrop: 'Add New Crop',
      editCrop: 'Edit Crop',
      deleteCrop: 'Delete Crop',
      confirmDelete: 'Are you sure you want to remove this crop record?',
      selectFarm: 'Select Farm',
      cropName: 'Crop Name',
      cropVariety: 'Variety / Hybrid',
      sowingDate: 'Sowing / Planting Date',
      expectedHarvestDate: 'Expected Harvest Date',
      cultivatedArea: 'Cultivated Area',
      growthStage: 'Crop Growth Stage',
      irrigationMethod: 'Irrigation Method',
      notes: 'Field Notes',
      saveCrop: 'Save Crop Record',
      saving: 'Saving Crop...',
      emptyTitle: 'No crops registered yet',
      emptyDesc: 'Add crop records to monitor growth stages, harvest schedules, and crop health.',
      addFirstCrop: 'Add Your First Crop',
      saveSuccess: 'Crop record saved successfully!',
      deleteSuccess: 'Crop record deleted successfully.',
    },
    activities: {
      title: 'Farm Activities Log',
      subtitle: 'Record and review daily agricultural operations, irrigation, and field work',
      logActivity: 'Log Farm Activity',
      activityType: 'Activity Type',
      activityDate: 'Date of Activity',
      selectFarm: 'Select Farm',
      selectCropOptional: 'Associated Crop (Optional)',
      description: 'Activity Details',
      descriptionPlaceholder: 'e.g. Carried out 4-hour drip cycle with bio-fertilizer mix',
      notes: 'Notes / Observations',
      notesPlaceholder: 'Observations on soil moisture, weed pressure, or equipment...',
      saveActivity: 'Save Activity Entry',
      saving: 'Saving Entry...',
      emptyTitle: 'No farm activities recorded yet',
      emptyDesc: 'Keep a comprehensive journal of irrigation, nutrient management, and field maintenance.',
      logFirstActivity: 'Log First Activity',
      saveSuccess: 'Farm activity logged successfully!',
      deleteSuccess: 'Farm activity entry deleted.',
    },
    profile: {
      title: 'Farmer Profile Management',
      subtitle: 'Review and update your personal and farm location details',
      accountInfo: 'Account Information',
      saveButton: 'Save Changes',
      saving: 'Saving Changes...',
      saveSuccess: 'Your profile has been updated successfully!',
      saveError: 'Failed to update profile. Please try again.',
      backToDashboard: 'Back to Dashboard',
    },
    cropDoctor: {
      badge: 'AI Crop Doctor',
      title: 'AI Crop Disease Doctor',
      subtitle: 'Upload a clear leaf or plant photograph. Powered by Google Gemini Vision via secure Supabase Edge Functions. It first identifies botanical crop species, then inspects visible pathology.',
      guideButton: 'Setup & Edge Function Guide',
      guideTitle: 'Supabase Edge Function Architecture (`crop-diagnosis`)',
      guideDesc: 'To keep your Gemini API key secret and secure, vision requests are verified by Supabase Authentication and executed on a serverless Supabase Edge Function:',
      guideNote: 'Alternatively, set GEMINI_API_KEY directly in the Supabase Dashboard under Project Settings > Edge Functions > Secrets.',
      errorTitle: 'Diagnosis Interrupted',
      uploadCardTitle: 'Upload Leaf or Plant Photo',
      uploadCardDesc: 'Works for Rice/Paddy, Tomato, Cotton, Chilli, Maize, Groundnut, and other crops. Take a clear, in-focus close-up.',
      changePhoto: 'Change Photo',
      dropzonePrompt: 'Click to browse or drag and drop crop photo',
      dropzoneHint: 'Supports JPG, PNG, WEBP (Up to 10MB)',
      runDiagnosisButton: 'Run AI Diagnosis',
      analyzingButton: 'Inspecting Plant with Gemini Vision...',
      guidelinesTitle: 'Identification Guidelines',
      guideline1: 'Parallel veins & grass habit: Identify graminoid species like Rice (Paddy) or Maize.',
      guideline2: 'Compound lobed leaves: Distinguish Solanaceae (Tomato, Chilli) from broadleaf crops (Cotton, Groundnut).',
      guideline3: 'Lighting: Ensure lesions or discolored spots are in sharp focus and not washed out by camera flash.',
      liveIntelTitle: 'Live Diagnostic Intelligence',
      defaultAssessment: 'AI Assessment',
      statusCompleted: 'Analysis Completed',
      statusUncertain: 'Uncertain Assessment',
      statusAwaiting: 'Awaiting Upload',
      taskATitle: 'Task A · Plant Species Identification',
      scientificNamePrefix: 'Scientific Name',
      observedTraitsTitle: 'Observed Botanical Traits:',
      taskBTitle: 'Task B · Pathology & Visible Symptoms',
      healthyCropTitle: 'Healthy Crop / No Visible Pathogen',
      observableSymptomsTitle: 'Observable Lesions & Symptoms:',
      uncertaintyTitle: 'Uncertainty Notice:',
      uncertaintyMessage: 'The model could not classify this crop or its symptoms with high certainty. Crop-specific chemical treatments are omitted to protect crop health. Please provide a closer, well-lit photo of the affected plant.',
      guidanceTitle: 'Agronomic Guidance & Next Steps',
      disclaimerPrefix: 'Disclaimer:',
      emptyStateTitle: 'No Active Diagnosis',
      emptyStateDesc: 'Upload a photograph of any crop leaf on the left and tap "Run AI Diagnosis" to inspect the plant.',
      analyzingTitle: 'Analyzing Plant Morphology...',
      analyzingDesc: 'Gemini Vision is inspecting botanical features and lesion patterns across the leaf.',
      translatingNotice: 'Translating diagnosis to Telugu...',
      translationFailedNotice: 'Telugu translation could not be loaded. Displaying original English diagnostic report.',
      confidenceHigh: 'High',
      confidenceModerate: 'Moderate',
      confidenceLow: 'Low / Uncertain',
      severityLabel: 'Disease Severity',
      severityLow: 'Low / Minor',
      severityMedium: 'Medium (Intervention Needed)',
      severityHigh: 'High (Urgent Attention)',
      organicTreatmentsTitle: 'Organic & Biological Remedies',
      chemicalTreatmentsTitle: 'Targeted Chemical Treatment (Cautious)',
      preventionTitle: 'Long-term Prevention & Cultural Practices',
      expertConsultTitle: 'When to Consult an Agricultural Specialist',
      expertConsultDesc: 'If symptoms spread rapidly to more than 20% of your field canopy within 48-72 hours, or if severe wilting/collar rot occurs, immediately consult your local Krishi Vigyan Kendra (KVK) or Assistant Agricultural Officer (AAO) with a physical plant sample.',
      historyTabTitle: 'Diagnosis History',
      liveDiagnosisTabTitle: 'Live AI Diagnosis',
      historyEmptyTitle: 'No Diagnosis Records Yet',
      historyEmptyDesc: 'Diagnoses you perform and save will be archived here for seasonal tracking and record keeping.',
      saveToHistoryButton: 'Save to My Records',
      savedToHistoryNotice: 'Diagnosis successfully saved to your farm records.',
      deleteHistoryConfirm: 'Are you sure you want to delete this diagnosis record?',
      historyDetailsTitle: 'Diagnosis Details',
      historyDateLabel: 'Diagnosis Date',
      historySymptomsLabel: 'Observable Symptoms',
      historyRecommendationsLabel: 'Agronomic Recommendations',
      historyConfidenceLabel: 'Diagnostic Confidence',
      historySeverityLabel: 'Severity Level',
      viewDetailsButton: 'View Details',
      closeModalButton: 'Close',
      deleteRecordTitle: 'Delete Diagnosis Record',
      deleteButton: 'Delete',
      cancelButton: 'Cancel',
      stepUploading: 'Uploading crop photo securely...',
      stepIdentifying: 'Identifying crop species & botanical traits...',
      stepAnalyzing: 'Inspecting leaf for pathology & visible lesions...',
      stepRecommendations: 'Formulating organic & agronomic guidance...',
      stepCompleting: 'Finalizing diagnosis report...',
      advisorBadge: 'AI Crop Solution Advisor',
      advisorTitle: 'Smart Crop Solution & Recovery Advisor',
      advisorSubtitle: 'Actionable root-cause diagnosis, rapid field actions, organic biopesticides, and a 3-to-7 day recovery plan.',
      likelyCauseTitle: 'Likely Underlying Cause',
      immediateActionsTitle: 'Immediate Response Actions (Next 24-48 Hours)',
      recoveryPlanTitle: 'Recovery Monitoring & Follow-up Schedule',
      followUp3dLabel: 'Day 3 Checkpoint',
      followUp7dLabel: 'Day 7 Recovery Assessment',
      logTreatmentButton: 'Record Treatment Application',
      treatmentModalTitle: 'Log Farm Treatment for Recovery Tracking',
      treatmentNameLabel: 'Treatment / Product Name',
      treatmentTypeLabel: 'Management Method',
      applicationDateLabel: 'Application Date',
      dosageOrMethodLabel: 'Application Method / Clean Water Ratio',
      observationsLabel: 'Field Notes & Weather Conditions',
      saveTreatmentButton: 'Save Treatment to Farm Log',
      treatmentSuccessNotice: 'Treatment successfully logged and linked to your farm recovery journal.',
      treatmentErrorNotice: 'Failed to record treatment. Please check fields and try again.',
      treatmentWarningCropMismatch: 'Crop Mismatch Warning: Diagnosed crop does not match the selected farm crop. Please select the correct registered crop or save under general field.',
      treatmentWarningCropBelongsToOtherFarm: 'The selected crop does not belong to the chosen farm plot. Please verify farm and crop selection.',
      chemicalDisclaimerWarning: 'Safety Advisory: AI chemical suggestions are strictly preliminary active ingredients. Always consult an agricultural extension officer (AAO/KVK) and comply with registered product packaging labels before preparing or spraying any chemical.',
      treatmentSelectFarm: 'Select Farm Plot',
      treatmentAssociatedCrop: 'Associated Crop',
      treatmentNoLinkedCrop: 'No specific crop (General Plot)',
      treatmentTypeOrganic: 'Organic / Biological',
      treatmentTypeChemical: 'Chemical Management',
      treatmentTypeCultural: 'Cultural / Sanitation',
      treatmentTypeOther: 'Other Management',
      treatmentStatusMonitoring: 'Under Monitoring',
      treatmentStatusRecovering: 'Recovering / Improving',
      treatmentStatusResolved: 'Resolved / Healthy',
      treatmentStatusNeedsFollowUp: 'Needs Follow-up / Worsening',
      treatmentStatusImproving: 'Improving',
      treatmentStatusUnchanged: 'Unchanged',
      treatmentStatusWorsening: 'Worsening',
      treatmentHistoryTabTitle: 'Treatment Journal',
      treatmentHistoryEmptyTitle: 'No Treatment Records Yet',
      treatmentHistoryEmptyDesc: 'Logged crop treatments, foliar sprays, and recovery monitoring follow-ups will appear here.',
      updateRecoveryStatusTitle: 'Update Field Recovery Status',
      saveStatusButton: 'Save Status & Observations',
      followUpCheckpointsTitle: 'Scheduled Follow-up Checkpoints',
      diagnosisLinkedBadge: 'Linked to AI Diagnosis',
      cropMatchedBadge: 'Diagnosed Crop Verified',
      generalFieldLabel: 'General Field / Unassigned',
      errInvalidFile: 'Please upload a valid image format (JPEG, PNG, WEBP).',
      errFileLimit: 'Image size exceeds 10MB limit. Please upload a smaller photo.',
      errGeneric: 'Analysis failed. Please try again with a clearer photograph.',
    },
    aboutSection: {
      badge: 'About KrishiRakshak AI',
      title: 'Empowering Farmers with Actionable Intelligence',
      description:
        'KrishiRakshak AI is a forward-looking digital agriculture platform built to protect standing crops, anticipate climate stressors, and guide farming households toward healthier yields.',
      missionTitle: 'Our Mission',
      missionDesc:
        'Bridge the gap between advanced computer vision, meteorological modeling, and grassroots farming, making agricultural expertise accessible to every farmer.',
      decisionTitle: 'Informed Decisions',
      decisionDesc:
        'From spotting foliar pathology symptoms before they cascade to planning irrigation around high-heat or excessive rain events, our intelligence layers take the guesswork out of field management.',
      languagesTitle: 'Bilingual & Multilingual Accessibility',
      languagesDesc:
        'Built with natural vernacular phrasing in English, Telugu, and Hindi so language is never an obstacle to smart farming.',
    },
    howItWorksSection: {
      badge: 'Simple Process',
      title: 'How KrishiRakshak AI Works',
      description: 'Four simple steps to make smarter farming decisions.',
      stepPrefix: 'STEP',
      steps: [
        {
          number: '01',
          title: 'Register Your Farm',
          description: 'Add your farm location, area and crop details.',
        },
        {
          number: '02',
          title: 'Upload Crop Image',
          description: 'Take a clear photograph of your affected crop leaf.',
        },
        {
          number: '03',
          title: 'AI Analysis',
          description: 'Understand possible crop problems and weather risks.',
        },
        {
          number: '04',
          title: 'Get Smart Advisory',
          description: 'Receive practical guidance in your preferred language.',
        },
      ],
    },
    cropDoctorSection: {
      badge: 'Meet Your AI Crop Doctor',
      title: "Understand Your Crop's Health Before Problems Spread",
      description:
        'Upload a clear photograph of an affected leaf. Our AI-powered assessment helps identify visible symptoms and possible crop health issues.',
      checklist: [
        'AI-powered leaf image assessment',
        'Simple explanations of visible symptoms',
        'Practical next-step recommendations',
        'Telugu and English guidance',
      ],
      ctaButton: 'Explore Crop Doctor',
      reportTag: 'CROP HEALTH REPORT',
      reportTitle: 'Tomato Leaf Analysis',
      sampleBadge: 'Sample',
      reportImageAlt: 'Tomato plant',
      issueLabel: 'Possible issue',
      issueTitle: 'Fungal leaf disease',
      issueDesc:
        'Illustrative observation: leaf discoloration and spotting may indicate a possible fungal issue.',
      recommendationsTitle: 'Recommended next steps',
      recommendations: [
        'Inspect nearby leaves for similar symptoms.',
        'Monitor whether the affected area is spreading.',
        'Consult an agricultural expert for confirmation.',
      ],
      disclaimer:
        'Demonstration only. This is illustrative sample content, not an actual AI diagnosis or verified confidence score.',
    },
    footer: {
      brandName: 'KrishiRakshak AI',
      tagline:
        'Smart Farming. Early Warnings. Better Harvests. Helping farmers make informed agricultural decisions through intelligent technology.',
      quickLinksTitle: 'Quick Links',
      quickLinks: {
        home: 'Home',
        features: 'Features',
        weather: 'Weather Intelligence',
        howItWorks: 'How It Works',
        about: 'About',
        dashboard: 'Dashboard',
        login: 'Login',
      },
      platformTitle: 'Our Platform',
      platformItems: [
        'AI Crop Doctor',
        'Weather Intelligence',
        'Crop Risk Assessment',
        'AI Farmer Assistant',
      ],
      copyright: '© 2026 KrishiRakshak AI. Built for smarter agriculture.',
    },
  },
  te: {
    nav: {
      brandName: 'KrishiRakshak',
      brandSubtitle: 'AI · స్మార్ట్ వ్యవసాయం',
      home: 'హోమ్',
      features: 'ఫీచర్లు',
      weather: 'వాతావరణం',
      howItWorks: 'ఇది ఎలా పనిచేస్తుంది',
      about: 'మా గురించి',
      currentLanguageLabel: 'తెలుగు',
      login: 'లాగిన్',
      register: 'నమోదు',
      dashboard: 'డ్యాష్‌బోర్డ్',
      profile: 'ప్రొఫైల్',
      logout: 'లాగ్ అవుట్',
      getStarted: 'ప్రారంభించండి',
      toggleMenuAria: 'మెనూ మార్చండి',
    },
    hero: {
      badge: 'AI ఆధారిత వ్యవసాయం',
      title: 'స్మార్ట్ వ్యవసాయం. ముందస్తు హెచ్చరికలు. మెరుగైన పంటలు.',
      description:
        'AI సాంకేతికతతో పంట సమస్యలను ముందుగానే గుర్తించండి, వాతావరణ పరిస్థితులను తెలుసుకోండి మరియు మీ భాషలో వ్యక్తిగతీకరించిన వ్యవసాయ మార్గదర్శకత్వం పొందండి.',
      getStarted: 'ప్రారంభించండి',
      exploreFeatures: 'ఫీచర్లను చూడండి',
      cropAssessmentBadge: 'AI పంట అంచనా',
      weatherIntelligenceBadge: 'వాతావరణ సమాచారం',
      floatingDoctorTitle: 'AI క్రాప్ డాక్టర్',
      floatingDoctorDesc: 'తెలివైన పంట పరిశీలన',
      floatingSmartTitle: 'స్మార్ట్ వ్యవసాయం',
      floatingSmartDesc: 'మెరుగైన పంట నిర్ణయాలు',
      heroImageAlt: 'వ్యవసాయ పొలాలు',
    },
    quickHighlights: [
      {
        title: 'AI క్రాప్ డాక్టర్',
        desc: 'పంట సమస్యలను ముందే గుర్తించండి',
      },
      {
        title: 'వాతావరణ సమాచారం',
        desc: 'వాతావరణ పరిస్థితులను గమనించండి',
      },
      {
        title: 'పంట ప్రమాద హెచ్చరికలు',
        desc: 'సంభావ్య పంట నష్టాలను అర్థం చేసుకోండి',
      },
    ],
    featuresSection: {
      badge: 'మా విశేషాలు',
      title: 'మీ వ్యవసాయానికి అవసరమైనవన్నీ ఒకే చోట',
      description:
        'రైతులు పంటలను పర్యవేక్షించడానికి, ప్రమాదాలను అర్థం చేసుకోవడానికి మరియు సరైన నిర్ణయాలు తీసుకోవడానికి సహాయపడే ఆధునిక వ్యవసాయ సాధనాలు.',
      cards: [
        {
          title: 'AI క్రాప్ డాక్టర్',
          description:
            'పంట ఆకుల ఫోటోలను విశ్లేషించి, సంభావ్య వ్యాధులు మరియు కనిపించే లక్షణాలను గుర్తించండి.',
        },
        {
          title: 'వాతావరణ సమాచారం',
          description:
            'ప్రస్తుత వాతావరణం, వర్షపాతం, తేమ మరియు రాబోయే వాతావరణ సూచనలను తెలుసుకోండి.',
        },
        {
          title: 'పంట నష్ట భయాల అంచనా',
          description:
            'వాతావరణ సంబంధిత పంట నష్ట భయాలను ముందస్తు అంచనాలతో అర్థం చేసుకోండి.',
        },
        {
          title: 'AI రైతు సహాయకుడు',
          description:
            'తెలుగు మరియు ఆంగ్లంలో సమాధానాలు అందించే సహాయకుడి ద్వారా వ్యవసాయ సలహాలు పొందండి.',
        },
        {
          title: 'వ్యవసాయ నిర్వహణ',
          description:
            'పొలాలు, పంట రకాలు, విత్తిన తేదీలు మరియు పెరుగుదల దశలను సులభంగా నిర్వహించండి.',
        },
        {
          title: 'స్కాన్ హిస్టరీ',
          description:
            'గతంలో చేసిన పంట పరిశీలనలు మరియు సలహాలను ఒకే చోట సమీక్షించండి.',
        },
      ],
    },
    weather: {
      dashboard: {
        badge: 'వాతావరణ సమాచారం',
        title: 'ఖచ్చితమైన పొలం వాతావరణం & ముందస్తు ముప్పు హెచ్చరికలు',
        description:
          'ఓపెన్-మెటియో ఆధారిత తాజా వాతావరణ అంచనాలు మరియు శాస్త్రీయ ప్రమాణాలతో రూపొందించిన ముందస్తు పంట ప్రమాద హెచ్చరికలు.',
        loadingTitle: 'పొలం వాతావరణాన్ని సేకరిస్తోంది...',
        loadingDesc: 'మీ నిర్దిష్ట పొలం కోఆర్డినేట్ల ఆధారంగా వాతావరణం లెక్కించబడుతోంది.',
        errorHeader: 'వాతావరణ సమాచారం పొందడం విఫలమైంది',
        retryButton: 'మళ్లీ ప్రయత్నించండి',
        invalidCoordinates: 'చెల్లని భౌగోళిక కోఆర్డినేట్లు అందించబడ్డాయి.',
        fetchErrorGeneric: 'వాతావరణ డేటా పొందడంలో సమస్య ఏర్పడింది. దయచేసి ఇంటర్నెట్ సరిచూసుకోండి.',
        apiServerError: 'ఓపెన్-మెటియో సర్వర్ తాత్కాలికంగా స్పందించడం లేదు. దయచేసి కొద్దిసేపటి తర్వాత ప్రయత్నించండి.',
        apiTimeoutError: 'వాతావరణ సర్వర్ కనెక్షన్ సమయం ముగిసింది. దయచేసి మళ్లీ ప్రయత్నించండి.',
        offlineError: 'ఇంటర్నెట్ కనెక్షన్ లేదు. దయచేసి నెట్‌వర్క్‌ను తనిఖీ చేయండి.',
      },
      location: {
        badge: 'పొలం స్థాన ఎంపిక',
        title: 'మీ వ్యవసాయ క్షేత్ర స్థానాన్ని ఎంచుకోండి',
        subtitle: 'మీ పరికరంలోని ఆటోమేటిక్ GPS ద్వారా లేదా ఇంటరాక్టివ్ మ్యాప్‌పై క్లిక్ చేసి మీ పొలాన్ని గుర్తించండి.',
        useGpsButton: 'GPS ద్వారా గుర్తించండి',
        gpsLocating: 'గుర్తిస్తోంది...',
        hideMapButton: 'మ్యాప్‌ను దాచు',
        showMapButton: 'మ్యాప్ చూపించు',
        mapInstruction: 'మ్యాప్‌పై మీ పొలం ఉన్న ప్రదేశంలో క్లిక్ చేయండి.',
        coordinatesLabel: 'ఎంపిక చేసిన స్థానం',
        confirmButton: 'ఈ స్థానాన్ని నిర్ధారించండి',
        confirmedButton: 'స్థానం నిర్ధారించబడింది',
        activeLocationLabel: 'ప్రస్తుత పొలం',
        noLocationYet: 'ఇంకా ఏ స్థానం ఎంచుకోలేదు',
        gpsLocatedName: 'GPS ఆధారిత స్థానం',
        mapSelectedName: 'మ్యాప్ ద్వారా ఎంచుకున్న పొలం',
        gpsNoticeTitle: 'లొకేషన్ అనుమతి గమనిక',
        gpsErrorPermission: 'లొకేషన్ అనుమతి నిరాకరించబడింది. దయచేసి బ్రౌజర్ అనుమతిని ఆన్ చేయండి లేదా క్రింది మ్యాప్‌లో మీ పొలాన్ని ఎంచుకోండి.',
        gpsErrorUnavailable: 'ప్రస్తుత GPS స్థానం అందుబాటులో లేదు. దయచేసి మ్యాప్‌ను ఉపయోగించి గుర్తించండి.',
        gpsErrorTimeout: 'లొకేషన్ గుర్తింపు సమయం ముగిసింది. దయచేసి మళ్లీ ప్రయత్నించండి.',
        gpsErrorUnsupported: 'మీ పరికరంలో GPS లొకేషన్ అందుబాటులో లేదు. దయచేసి మ్యాప్‌ను ఉపయోగించండి.',
      },
      current: {
        locationLabel: 'పొలం కోఆర్డినేట్లు',
        lastUpdated: 'నవీకరించబడింది',
        feelsLike: 'అనుభూతి చెందే ఉష్ణోగ్రత',
        feelsLikeShort: 'అనుభూతి',
        humidity: 'గాలిలో తేమ',
        rainfall: 'వర్షపాతం',
        windSpeed: 'గాలి వేగం',
        sunrise: 'సూర్యోదయం',
        sunset: 'సూర్యాస్తమయం',
        timezoneLabel: 'టైమ్‌జోన్',
        temperature: 'ఉష్ణోగ్రత',
      },
      conditions: {
        clearSky: 'నిర్మలమైన ఆకాశం',
        mainlyClear: 'ఎక్కువగా నిర్మలం',
        partlyCloudy: 'పాక్షికంగా మేఘావృతం',
        overcast: 'పూర్తిగా మేఘావృతం',
        fog: 'పొగమంచు',
        drizzle: 'చిరుజల్లులు',
        freezingDrizzle: 'శీతల చిరుజల్లులు',
        slightRain: 'తేలికపాటి వర్షం',
        moderateRain: 'మోస్తరు వర్షం',
        heavyRain: 'భారీ వర్షం',
        freezingRain: 'గడ్డకట్టే వర్షం',
        snow: 'మంచు వర్షం',
        rainShowers: 'వర్షపు జల్లులు',
        violentRainShowers: 'తీవ్రమైన వర్షపు జల్లులు',
        snowShowers: 'మంచు తుఫాను',
        thunderstorm: 'ఉరుములతో కూడిన వర్షం',
        thunderstormWithHail: 'వడగండ్ల వాన',
      },
      forecast: {
        badge: 'వాతావరణ సూచన',
        title: 'రాబోయే 24 గంటలు & 7 రోజుల వాతావరణ అంచనా',
        subtitle: 'గంటల వారీ ఉష్ణోగ్రతలు మరియు రాబోయే వారం రోజుల సమాచారంతో వ్యవసాయ పనులను సులభంగా ప్లాన్ చేసుకోండి.',
        tabHourly: '24 గంటల సూచన',
        tabDaily: '7 రోజుల సూచన',
        hourlyChartTitle: '24 గంటల ఉష్ణోగ్రత & వర్ష సంభావ్యత గ్రాఫ్',
        tempLegend: 'ఉష్ణోగ్రత',
        rainLegend: 'వర్ష సంభావ్యత',
        rainChance: 'వర్షం అవకాశం',
        days: {
          today: 'ఈరోజు',
          tomorrow: 'రేపు',
          sunday: 'ఆది',
          monday: 'సోమ',
          tuesday: 'మంగళ',
          wednesday: 'బుధ',
          thursday: 'గురు',
          friday: 'శుక్ర',
          saturday: 'శని',
        },
      },
      risk: {
        badge: 'ప్రాథమిక ప్రమాద విశ్లేషణ',
        title: 'పంట వాతావరణ ముప్పు అంచనా',
        subtitle: 'వాతావరణ పరిస్థితుల ఆధారంగా ముందస్తు హెచ్చరికలు మరియు ఆచరణాత్మక వ్యవసాయ సలహాలు.',
        overallStatusLabel: 'మొత్తం పరిస్థితి',
        severityLow: 'అనుకూలం (తక్కువ ముప్పు)',
        severityModerate: 'జాగ్రత్త (మధ్యస్థ ముప్పు)',
        severityHigh: 'హెచ్చరిక (అధిక ముప్పు)',
        metricLabel: 'అంచనా విలువ',
        thresholdLabel: 'శాస్త్రీయ ప్రమాణం',
        advisoryHeader: 'ప్రాథమిక వ్యవసాయ సలహా',
        disclaimerText: 'గమనిక: ఇవి వాతావరణ పరిస్థితుల ఆధారిత ప్రాథమిక హెచ్చరికలు మాత్రమే, ప్రత్యక్ష పంట నష్ట నిర్ధారణలు కావు. నిర్దిష్ట పంట రకం, నేల స్వభావం మరియు స్థానిక వాతావరణం ప్రకారం ప్రభావం మారవచ్చు.',
        riskSummaryLow: 'ప్రస్తుత వాతావరణ పరిస్థితులు సాధారణ వ్యవసాయ పనులకు అనుకూలంగా ఉన్నాయి.',
        riskSummaryModerate: 'కొన్ని వాతావరణ మార్పులు గమనించబడ్డాయి. పొలం పరిస్థితిని పరిశీలిస్తూ తగిన జాగ్రత్తలు తీసుకోండి.',
        riskSummaryHigh: 'తీవ్రమైన వాతావరణ హెచ్చరికలు ఉన్నాయి! పంట రక్షణకు సిఫార్సు చేసిన చర్యలను వెంటనే పరిశీలించండి.',
        riskRainHeavyTitle: 'భారీ వర్షపాత హెచ్చరిక',
        riskRainHeavyDesc: 'రాబోయే 24 గంటల్లో 50 మి.మీ కంటే ఎక్కువ వర్షం కురిసే అవకాశం ఉంది. లోతట్టు ప్రాంతాలలో నీరు నిలిచి వేరు కుళ్లు ఏర్పడే ప్రమాదం ఉంది.',
        riskRainHeavyAdv: 'పొలంలో మురుగునీటి కాల్వలను తక్షణమే శుభ్రపరచండి. ఎరువులు చల్లడం మరియు క్రిమిసంహారక మందుల పిచికారీని వాయిదా వేయండి.',
        riskRainModerateTitle: 'మోస్తరు వర్షం కురిసే అవకాశం',
        riskRainModerateDesc: 'మోస్తరు వర్షపు జల్లులు కురుస్తాయి. నేలలో తేమ నిల్వకు ఇది ఉపయోగకరమే అయినా అధిక నీరు నిల్వ ఉండకుండా చూసుకోండి.',
        riskRainModerateAdv: 'గట్లు మరియు నీటి పారుదల ద్వారాలను పరిశీలించండి. అదనపు నీటిపారుదల ఇవ్వకండి.',
        riskRainLowTitle: 'సాధారణ వర్షపాత పరిస్థితులు',
        riskRainLowDesc: 'తేలికపాటి లేదా వర్షం లేని సాధారణ వాతావరణం. సాధారణ వ్యవసాయ పనులకు అనుకూలం.',
        riskRainLowAdv: 'నేలలోని తేమను బట్టి క్రమం తప్పకుండా నీటిపారుదల మరియు వ్యవసాయ పనులను కొనసాగించండి.',
        riskTempHighTitle: 'అధిక ఉష్ణోగ్రత హెచ్చరిక (వేడి ఒత్తిడి)',
        riskTempHighDesc: 'ఉష్ణోగ్రత 38 °C దాటే అవకాశం ఉంది. అధిక భాష్పీభవనం వల్ల పూత రాలడం, పంట వాడిపోవడం వంటి ప్రమాదాలు ఉన్నాయి.',
        riskTempHighAdv: 'ఉదయం లేదా సాయంత్రం వేళల్లో తేలికపాటి తడులు ఇవ్వండి. నేలలో తేమ ఆరిపోకుండా రక్షక పొరను (మల్చింగ్) ఉంచండి.',
        riskTempModerateTitle: 'పగటి ఉష్ణోగ్రత పెరుగుదల',
        riskTempModerateDesc: 'సాధారణం కంటే ఎక్కువ వేడి ఉండవచ్చు. తేలికపాటి నేలల్లో తేమ త్వరగా తగ్గిపోతుంది.',
        riskTempModerateAdv: 'నేలలో తేమ శాతాన్ని పరిశీలిస్తూ ఉండండి. మధ్యాహ్నం ఎండ తీవ్రతకు ముందే నీరు అందించండి.',
        riskTempLowTitle: 'అనుకూలమైన ఉష్ణోగ్రత',
        riskTempLowDesc: 'ప్రాంతీయ పంటల ఏపుగా పెరగడానికి ఉష్ణోగ్రత అనుకూలమైన పరిధిలో ఉంది.',
        riskTempLowAdv: 'సాధారణ ఎదుగుదల వాతావరణం. సాధారణ ఎరువులు మరియు సంరక్షణ పద్ధతులను కొనసాగించండి.',
        riskHumidityHighTitle: 'అధిక తేమ హెచ్చరిక (శిలీంధ్ర అనుకూలత)',
        riskHumidityHighDesc: 'గాలిలో తేమ 85% పైబడి ఉండటం వల్ల శిలీంధ్ర తెగుళ్లు మరియు బూజు వ్యాపించడానికి అనుకూల పరిస్థితులు ఏర్పడతాయి.',
        riskHumidityHighAdv: 'పైరుకు గాలి, వెలుతురు సోకేలా చూసుకోండి. ఆకుల అడుగు భాగాన తెగులు లక్షణాలు ఏమైనా ఉన్నాయేమో నిశితంగా పరిశీలించండి.',
        riskHumidityModerateTitle: 'మధ్యస్థ గాలి తేమ',
        riskHumidityModerateDesc: 'మోస్తరు తేమ శాతం. మేఘావృతమైన సమయాల్లో పైరు ఆరోగ్యాన్ని గమనిస్తూ ఉండండి.',
        riskHumidityModerateAdv: 'పొలంలో గాలి ప్రసరణ బాగుండేలా చూడండి. సాయంత్రం వేళల్లో ఆకులపై ఎక్కువ నీరు పడకుండా జాగ్రత్త వహించండి.',
        riskHumidityLowTitle: 'సాధారణ గాలి తేమ',
        riskHumidityLowDesc: 'గాలిలో తేమ సాధారణ స్థాయిలో ఉంది. తేమ సంబంధిత తెగుళ్ల ముప్పు తక్కువగా ఉంది.',
        riskHumidityLowAdv: 'ఆకులు పొడిగా ఉండటం వల్ల పంట ఆరోగ్యంగా ఉండటానికి మరియు మందుల పిచికారీకి అనుకూల సమయం.',
        riskWindHighTitle: 'బలమైన ఈదురు గాలుల హెచ్చరిక',
        riskWindHighDesc: 'గాలి వేగం 40 కి.మీ/గం దాటే అవకాశం ఉంది. అరటి, మొక్కజొన్న, చెరకు వంటి పొడవైన పంటలు నేలవాలే ప్రమాదం ఉంది.',
        riskWindHighAdv: 'బలహీనమైన పైర్లకు ఊతకర్రలు లేదా మట్టి ఎగదోయడం చేయండి. షేడ్‌నెట్లను బిగించండి, ఎత్తైన చోట్ల పిచికారీ ఆపండి.',
        riskWindModerateTitle: 'మోస్తరు గాలి వేగం',
        riskWindModerateDesc: '25 నుండి 40 కి.మీ/గం వరకు గాలులు వీస్తాయి. మందులు పిచికారీ చేసేటప్పుడు ద్రావణం పక్కకు కొట్టుకుపోయే ప్రమాదం ఉంది.',
        riskWindModerateAdv: 'క్రిమిసంహారక మరియు కలుపు మందుల పిచికారీని గాలులు తగ్గే వరకు వాయిదా వేయండి.',
        riskWindLowTitle: 'ప్రశాంతమైన గాలి పరిస్థితులు',
        riskWindLowDesc: 'తేలికపాటి గాలి వీస్తోంది. పంటలపై ఎలాంటి యాంత్రిక ఒత్తిడి ఉండదు.',
        riskWindLowAdv: 'సూక్ష్మపోషకాలు మరియు పురుగుమందుల సమర్థవంతమైన పిచికారీకి అత్యంత అనుకూలమైన వాతావరణం.',
      },
    },
    auth: {
      loginTitle: 'రైతు లాగిన్',
      loginSubtitle: 'మీ వ్యవసాయ సమాచారం మరియు సలహాలను పొందడానికి లాగిన్ అవ్వండి',
      registerTitle: 'రైతు నమోదు',
      registerSubtitle: 'వ్యక్తిగతీకరించిన పంట రక్షణ కోసం మీ ఖాతాను సృష్టించండి',
      forgotPasswordTitle: 'పాస్‌వర్డ్ మర్చిపోయారా?',
      forgotPasswordSubtitle: 'రికవరీ లింక్ అందుకోవడానికి మీ నమోదిత ఇమెయిల్‌ను నమోదు చేయండి',
      resetPasswordTitle: 'కొత్త పాస్‌వర్డ్ సెట్ చేయండి',
      resetPasswordSubtitle: 'క్రింద మీ కొత్త సురక్షిత పాస్‌వర్డ్‌ను నమోదు చేయండి',
      fullName: 'పూర్తి పేరు',
      fullNamePlaceholder: 'ఉదా. రమేష్ రెడ్డి',
      email: 'ఇమెయిల్ చిరునామా',
      emailPlaceholder: 'farmer@example.com',
      phone: 'మొబైల్ నంబర్',
      phonePlaceholder: '10 అంకెల మొబైల్ నంబర్',
      password: 'పాస్‌వర్డ్',
      passwordPlaceholder: 'కనీసం 6 అక్షరాలు',
      confirmPassword: 'పాస్‌వర్డ్ నిర్ధారించండి',
      confirmPasswordPlaceholder: 'పాస్‌వర్డ్‌ను మళ్లీ నమోదు చేయండి',
      newPassword: 'కొత్త పాస్‌వర్డ్',
      newPasswordPlaceholder: 'కనీసం 6 అక్షరాలు',
      village: 'గ్రామం / పట్టణం',
      villagePlaceholder: 'ఉదా. గుడివాడ',
      district: 'జిల్లా',
      districtPlaceholder: 'ఉదా. కృష్ణా',
      state: 'రాష్ట్రం',
      statePlaceholder: 'ఉదా. ఆంధ్రప్రదేశ్',
      rememberMe: 'నన్ను లాగిన్‌లో ఉంచు',
      forgotPasswordLink: 'పాస్‌వర్డ్ మర్చిపోయారా?',
      loginButton: 'లాగిన్ అవ్వండి',
      registerButton: 'రైతు ఖాతాను సృష్టించండి',
      sendResetLink: 'పాస్‌వర్డ్ రీసెట్ లింక్ పంపండి',
      updatePasswordButton: 'పాస్‌వర్డ్‌ను నవీకరించండి',
      backToLogin: 'లాగిన్‌కు తిరిగి వెళ్లండి',
      haveAccount: 'ఇప్పటికే ఖాతా ఉందా?',
      noAccount: 'ఖాతా లేదా?',
      registerNow: 'ఇక్కడ నమోదు చేసుకోండి',
      loginNow: 'ఇక్కడ లాగిన్ అవ్వండి',
      errRequired: 'ఈ ఫీల్డ్ తప్పనిసరి',
      errEmail: 'దయచేసి సరైన ఇమెయిల్‌ను నమోదు చేయండి',
      errPhone: 'దయచేసి సరైన 10 అంకెల భారతీయ మొబైల్ నంబర్‌ను నమోదు చేయండి',
      errPasswordMin: 'పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి',
      errPasswordMatch: 'పాస్‌వర్డ్‌లు సరిపోలడం లేదు',
      errGeneric: 'ప్రామాణీకరణ విఫలమైంది. దయచేసి వివరాలను సరిచూసుకోండి.',
      regSuccessVerification: 'నమోదు విజయవంతమైంది! మీ ఇమెయిల్‌కు ధృవీకరణ లింక్ పంపబడింది. లాగిన్ చేయడానికి ముందు దయచేసి మీ ఇమెయిల్‌ను ధృవీకరించండి.',
      resetEmailSent: 'పాస్‌వర్డ్ రికవరీ ఇమెయిల్ పంపబడింది. దయచేసి మీ ఇన్‌బాక్స్ తనిఖీ చేయండి.',
      passwordResetSuccess: 'పాస్‌వర్డ్ విజయవంతంగా నవీకరించబడింది! ఇప్పుడు మీరు లాగిన్ చేయవచ్చు.',
      signingIn: 'లాగిన్ అవుతోంది...',
      registering: 'ఖాతా సృష్టిస్తోంది...',
      sending: 'లింక్ పంపుతోంది...',
      updating: 'నవీకరిస్తోంది...',
      continueWithGoogle: 'Googleతో కొనసాగించండి',
      signUpWithGoogle: 'Googleతో నమోదు చేసుకోండి',
      orContinueWith: 'లేదా Googleతో కొనసాగించండి',
    },
    dashboard: {
      title: 'రైతు డ్యాష్‌బోర్డ్',
      welcome: 'స్వాగతం',
      tagline: 'మీ వ్యక్తిగతీకరించిన స్మార్ట్ వ్యవసాయ మరియు పంట రక్షణ పోర్టల్',
      profileSummary: 'రైతు ప్రొఫైల్',
      editProfile: 'ప్రొఫైల్ సవరించండి',
      emailLabel: 'ఇమెయిల్',
      phoneLabel: 'మొబైల్',
      locationLabel: 'ప్రాంతం',
      memberSince: 'చేరిన తేదీ',
      weatherCardTitle: 'ప్రత్యక్ష పొలం వాతావరణం',
      weatherCardDesc: 'ఖచ్చితమైన వాతావరణ సూచన & పర్యావరణ ముప్పు అంచనా',
      viewWeather: 'వాతావరణ మాడ్యూల్ చూడండి',
      cropDoctorTitle: 'AI క్రాప్ డాక్టర్',
      cropDoctorDesc: 'ఆకులను స్కాన్ చేసి పంట తెగుళ్ల లక్షణాలను ముందే గుర్తించండి',
      startScan: 'క్రాప్ డాక్టర్‌ను తెరవండి',
      recentActivityTitle: 'ఇటీవలి పంట & వ్యవసాయ కార్యకలాపాలు',
      noActivity: 'ఇంకా ఎలాంటి పంట స్కాన్లు లేదా కార్యకలాపాలు నమోదు కాలేదు.',
      logout: 'లాగ్ అవుట్',
      quickStatsFarms: 'నమోదిత పొలాలు',
      quickStatsScans: 'పంట ఆరోగ్య తనిఖీలు',
      quickStatsStatus: 'రక్షణ స్థితి',
      activeProtection: 'క్రియాశీలకం',
      totalLandArea: 'మొత్తం సాగు భూమి',
      activeCrops: 'సాగులో ఉన్న పంటలు',
      emptyFarmTitle: 'మీ వ్యవసాయ ప్రయాణం ఇక్కడే ప్రారంభమవుతుంది.',
      emptyFarmDesc: 'వ్యక్తిగతీకరించిన వాతావరణ సమాచారం, పంట నిర్వహణ మరియు తెగుళ్ల పర్యవేక్షణ కోసం మీ పొలాన్ని నమోదు చేయండి.',
      registerFirstFarm: 'మీ మొదటి పొలాన్ని నమోదు చేయండి',
      sidebar: {
        dashboard: 'డ్యాష్‌బోర్డ్',
        myFarm: 'నా పొలం',
        weather: 'వాతావరణ సమాచారం',
        cropDoctor: 'AI క్రాప్ డాక్టర్',
        cropManagement: 'పంట నిర్వహణ',
        farmActivities: 'వ్యవసాయ పనులు',
        profile: 'నా ప్రొఫైల్',
        settings: 'సెట్టింగ్‌లు',
        logout: 'లాగ్ అవుట్',
      },
    },
    farm: {
      title: 'పొలం నిర్వహణ',
      subtitle: 'మీ వ్యవసాయ క్షేత్రాలు మరియు నేల వివరాలను నమోదు చేయండి & నిర్వహించండి',
      registerNewFarm: 'కొత్త పొలాన్ని నమోదు చేయండి',
      editFarm: 'పొలం వివరాలను సవరించండి',
      deleteFarm: 'పొలాన్ని తొలగించండి',
      confirmDeleteTitle: 'పొలం రికార్డును తొలగించాలా?',
      confirmDeleteBody: 'మీరు ఖచ్చితంగా ఈ పొలాన్ని తొలగించాలనుకుంటున్నారా? దీనితో అనుబంధించబడిన పంట వివరాలు మరియు వ్యవసాయ పనుల రికార్డులు కూడా తొలగించబడతాయి.',
      saveFarm: 'పొలం వివరాలను భద్రపరచండి',
      saving: 'భద్రపరుస్తోంది...',
      farmName: 'పొలం పేరు',
      farmNamePlaceholder: 'ఉదా. గంగా వ్యవసాయ క్షేత్రం',
      village: 'గ్రామం / ప్రాంతం',
      villagePlaceholder: 'ఉదా. గుడివాడ',
      district: 'జిల్లా',
      districtPlaceholder: 'ఉదా. కృష్ణా',
      state: 'రాష్ట్రం',
      statePlaceholder: 'ఉదా. ఆంధ్రప్రదేశ్',
      landArea: 'మొత్తం భూమి విస్తీర్ణం',
      landAreaPlaceholder: 'ఉదా. 5.5',
      landAreaUnit: 'విస్తీర్ణ కొలమానం',
      soilType: 'నేల రకం',
      irrigationType: 'నీటిపారుదల రకం',
      waterSource: 'ప్రధాన నీటి వనరు',
      waterSourcePlaceholder: 'ఉదా. బోరుబావి మరియు కాలువ',
      description: 'పొలం వివరణ / వివరాలు',
      descriptionPlaceholder: 'నేల స్వభావం, ఎత్తుపల్లాలు లేదా కంచె గురించిన అదనపు సమాచారం...',
      locationCoordinates: 'భౌగోళిక కోఆర్డినేట్లు',
      latitude: 'అక్షాంశం (Latitude)',
      longitude: 'రేఖాంశం (Longitude)',
      detectGps: 'ప్రస్తుత స్థానాన్ని గుర్తించండి (GPS)',
      gpsDetecting: 'GPS ద్వారా గుర్తిస్తోంది...',
      pinLocationMap: 'మ్యాప్‌పై పొలాన్ని ఎంచుకోండి',
      selectOnMap: 'మీ పొలం స్థానాన్ని గుర్తించడానికి మ్యాప్‌పై క్లిక్ చేయండి',
      emptyTitle: 'ఇంకా ఎలాంటి పొలాలు నమోదు కాలేదు',
      emptyDesc: 'ఖచ్చితమైన వాతావరణ అంచనాలు మరియు ముప్పు హెచ్చరికల కోసం మీ మొదటి పొలాన్ని జోడించండి.',
      addFirstFarm: 'మీ మొదటి పొలాన్ని నమోదు చేయండి',
      saveSuccess: 'పొలం వివరాలు విజయవంతంగా భద్రపరచబడ్డాయి!',
      updateSuccess: 'పొలం వివరాలు విజయవంతంగా నవీకరించబడ్డాయి!',
      deleteSuccess: 'పొలం విజయవంతంగా తొలగించబడింది.',
      saveError: 'పొలం వివరాలు భద్రపరచడం విఫలమైంది. దయచేసి వివరాలను తనిఖీ చేయండి.',
    },
    crops: {
      title: 'పంట నిర్వహణ',
      subtitle: 'సాగులో ఉన్న పంట రకాలు, పెరుగుదల దశలు మరియు కోత తేదీలను పర్యవేక్షించండి',
      addCrop: 'కొత్త పంటను జోడించండి',
      editCrop: 'పంటను సవరించండి',
      deleteCrop: 'పంటను తొలగించండి',
      confirmDelete: 'మీరు ఖచ్చితంగా ఈ పంట రికార్డును తీసివేయాలనుకుంటున్నారా?',
      selectFarm: 'పొలాన్ని ఎంచుకోండి',
      cropName: 'పంట పేరు',
      cropVariety: 'రకం / హైబ్రిడ్',
      sowingDate: 'విత్తిన / నాటిన తేదీ',
      expectedHarvestDate: 'అంచనా వేసిన కోత తేదీ',
      cultivatedArea: 'సాగు విస్తీర్ణం',
      growthStage: 'పంట పెరుగుదల దశ',
      irrigationMethod: 'నీటిపారుదల పద్ధతి',
      notes: 'పంట గమనికలు',
      saveCrop: 'పంట రికార్డును భద్రపరచండి',
      saving: 'భద్రపరుస్తోంది...',
      emptyTitle: 'ఇంకా పంటలేవీ నమోదు కాలేదు',
      emptyDesc: 'పంట దశలు, కోత షెడ్యూల్ మరియు ఆరోగ్యాన్ని ట్రాక్ చేయడానికి పంట వివరాలను జోడించండి.',
      addFirstCrop: 'మీ మొదటి పంటను జోడించండి',
      saveSuccess: 'పంట రికార్డు విజయవంతంగా భద్రపరచబడింది!',
      deleteSuccess: 'పంట రికార్డు విజయవంతంగా తొలగించబడింది.',
    },
    activities: {
      title: 'వ్యవసాయ పనుల డైరీ',
      subtitle: 'రోజువారీ వ్యవసాయ పనులు, నీటిపారుదల మరియు ఫీల్డ్ కార్యకలాపాలను నమోదు చేయండి',
      logActivity: 'పనిని నమోదు చేయండి',
      activityType: 'పని రకం',
      activityDate: 'పని చేసిన తేదీ',
      selectFarm: 'పొలాన్ని ఎంచుకోండి',
      selectCropOptional: 'సంబంధిత పంట (ఐచ్ఛికం)',
      description: 'పని వివరాలు',
      descriptionPlaceholder: 'ఉదా. బయో-ఎరువులతో కలిపి 4 గంటల డ్రిప్ ఇరిగేషన్ పూర్తి చేశాం',
      notes: 'గమనికలు / పరిశీలనలు',
      notesPlaceholder: 'నేల తేమ, కలుపు లేదా యంత్రాల గురించిన పరిశీలనలు...',
      saveActivity: 'పనిని భద్రపరచండి',
      saving: 'భద్రపరుస్తోంది...',
      emptyTitle: 'ఇంకా ఎలాంటి పనులు నమోదు కాలేదు',
      emptyDesc: 'నీటిపారుదల, ఎరువులు మరియు పొలం నిర్వహణ పనుల యొక్క సమగ్ర డైరీని నిర్వహించండి.',
      logFirstActivity: 'మొదటి పనిని నమోదు చేయండి',
      saveSuccess: 'వ్యవసాయ పని విజయవంతంగా నమోదు చేయబడింది!',
      deleteSuccess: 'పని రికార్డు తొలగించబడింది.',
    },
    profile: {
      title: 'రైతు ప్రొఫైల్ నిర్వహణ',
      subtitle: 'మీ వ్యక్తిగత మరియు పొలం లొకేషన్ వివరాలను సమీక్షించండి మరియు నవీకరించండి',
      accountInfo: 'ఖాతా సమాచారం',
      saveButton: 'మార్పులను భద్రపరచండి',
      saving: 'భద్రపరుస్తోంది...',
      saveSuccess: 'మీ ప్రొఫైల్ విజయవంతంగా నవీకరించబడింది!',
      saveError: 'ప్రొఫైల్ నవీకరణ విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.',
      backToDashboard: 'డ్యాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి',
    },
    cropDoctor: {
      badge: 'AI పంట వైద్యుడు',
      title: 'AI పంట తెగుళ్ల నిర్ధారణ డాక్టర్',
      subtitle: 'స్పష్టమైన ఆకు లేదా పంట ఫోటోను అప్‌లోడ్ చేయండి. సురక్షితమైన సుపాబేస్ ఎడ్జ్ ఫంక్షన్ల ద్వారా గూగుల్ జెమిని విజన్‌తో పనిచేస్తుంది. మొదట మొక్క రకాన్ని గుర్తించి, ఆపై కనిపించే తెగుళ్లు మరియు లక్షణాలను విశ్లేషిస్తుంది.',
      guideButton: 'సెటప్ & ఎడ్జ్ ఫంక్షన్ మార్గదర్శి',
      guideTitle: 'సుపాబేస్ ఎడ్జ్ ఫంక్షన్ నిర్మాణం (`crop-diagnosis`)',
      guideDesc: 'మీ జెమిని API కీని అత్యంత సురక్షితంగా ఉంచడానికి, ప్రతి విశ్లేషణ అభ్యర్థన సర్వర్‌లెస్ సుపాబేస్ ఎడ్జ్ ఫంక్షన్ ద్వారా ప్రాసెస్ చేయబడుతుంది:',
      guideNote: 'లేదా, సుపాబేస్ డాష్‌బోర్డ్‌లో Project Settings > Edge Functions > Secrets లో GEMINI_API_KEY ను నేరుగా కాన్ఫిగర్ చేయండి.',
      errorTitle: 'పరీక్ష నిలిపివేయబడింది',
      uploadCardTitle: 'ఆకు లేదా పంట ఫోటోను అప్‌లోడ్ చేయండి',
      uploadCardDesc: 'వరి, టమాటా, పత్తి, మిరప, మొక్కజొన్న, వేరుశనగ మరియు ఇతర పంటల కోసం పనిచేస్తుంది. స్పష్టమైన క్లోజప్ ఫోటోను తీయండి.',
      changePhoto: 'ఫోటో మార్చండి',
      dropzonePrompt: 'ఫోటోను ఎంచుకోవడానికి ఇక్కడ క్లిక్ చేయండి లేదా డ్రాగ్ చేయండి',
      dropzoneHint: 'JPG, PNG, WEBP సపోర్ట్ చేస్తుంది (గరిష్టంగా 10MB)',
      runDiagnosisButton: 'AI పరీక్ష ప్రారంభించండి',
      analyzingButton: 'జెమిని విజన్‌తో పంటను పరిశీలిస్తోంది...',
      guidelinesTitle: 'గుర్తింపు మార్గదర్శకాలు',
      guideline1: 'సమాంతర ఈనెలు & గడ్డి జాతి లక్షణాలు: వరి లేదా మొక్కజొన్న వంటి పైర్లను సూచిస్తాయి.',
      guideline2: 'సంయుక్త తమ్మెల ఆకులు: టమాటా, మిరప వంటి సొలనేసి పంటలను పత్తి, వేరుశనగ నుండి వేరు చేస్తాయి.',
      guideline3: 'స్పష్టమైన కాంతి: తెగులు మచ్చలు స్పష్టంగా కనిపించేలా ఫోకస్ చేయండి, ఫ్లాష్ కాంతితో వెలిసిపోకుండా చూసుకోండి.',
      liveIntelTitle: 'ప్రత్యక్ష విశ్లేషణ సమాచారం',
      defaultAssessment: 'AI విశ్లేషణ',
      statusCompleted: 'విశ్లేషణ పూర్తయింది',
      statusUncertain: 'అస్పష్టమైన విశ్లేషణ',
      statusAwaiting: 'ఫోటో కోసం వేచిచూస్తోంది',
      taskATitle: 'టాస్క్ A · మొక్క జాతి గుర్తింపు',
      scientificNamePrefix: 'శాస్త్రీయ నామం',
      observedTraitsTitle: 'గమనించిన వృక్ష లక్షణాలు:',
      taskBTitle: 'టాస్క్ B · తెగులు & కనిపించే లక్షణాలు',
      healthyCropTitle: 'ఆరోగ్యకరమైన పంట / తెగులు లక్షణాలు లేవు',
      observableSymptomsTitle: 'కనిపించే మచ్చలు & తెగులు లక్షణాలు:',
      uncertaintyTitle: 'అనిశ్చితి గమనిక:',
      uncertaintyMessage: 'మోడల్ ఈ పంటను లేదా దాని లక్షణాలను అధిక కచ్చితత్వంతో వర్గీకరించలేకపోయింది. పంట ఆరోగ్య రక్షణ దృష్ట్యా నిర్దిష్ట రసాయన చికిత్సలు సూచించబడలేదు. దయచేసి మరింత స్పష్టమైన, దగ్గరి ఫోటోను అందించండి.',
      guidanceTitle: 'వ్యవసాయ సలహాలు & తదుపరి చర్యలు',
      disclaimerPrefix: 'గమనిక:',
      emptyStateTitle: 'సక్రియ విశ్లేషణ ఏదీ లేదు',
      emptyStateDesc: 'ఎడమవైపు ఏదైనా పంట ఆకు ఫోటోను అప్‌లోడ్ చేసి, పరీక్షించడానికి "AI పరీక్ష ప్రారంభించండి" బటన్‌పై నొక్కండి.',
      analyzingTitle: 'మొక్క రూపురేఖలను విశ్లేషిస్తోంది...',
      analyzingDesc: 'జెమిని విజన్ ఆకులోని వృక్ష లక్షణాలు మరియు తెగులు మచ్చల నమూనాలను పరిశీలిస్తోంది.',
      translatingNotice: 'విశ్లేషణ ఫలితాలను తెలుగులోకి అనువదిస్తోంది...',
      translationFailedNotice: 'తెలుగు అనువాదం అందుబాటులో లేదు. అసలు ఆంగ్ల నివేదిక ప్రదర్శించబడుతోంది.',
      confidenceHigh: 'అధికం',
      confidenceModerate: 'మధ్యస్థం',
      confidenceLow: 'తక్కువ / అస్పష్టం',
      severityLabel: 'తెగులు తీవ్రత',
      severityLow: 'తక్కువ / స్వల్పం',
      severityMedium: 'మధ్యస్థం (చర్యలు అవసరం)',
      severityHigh: 'ఎక్కువ (తక్షణ శ్రద్ధ అవసరం)',
      organicTreatmentsTitle: 'సేంద్రీయ & బయో-నివారణ పద్ధతులు',
      chemicalTreatmentsTitle: 'రసాయన యాజమాన్యం (జాగ్రత్తగా)',
      preventionTitle: 'దీర్ఘకాలిక నివారణ & సాగు పద్ధతులు',
      expertConsultTitle: 'వ్యవసాయ నిపుణుడిని ఎప్పుడు సంప్రదించాలి?',
      expertConsultDesc: 'తెగులు లక్షణాలు 48-72 గంటల్లో పొలంలో 20% కంటే ఎక్కువ పంటకు వ్యాపిస్తే, లేదా మొక్కలు వేగంగా వడలిపోతుంటే, వెంటనే ఆకు నమూనాతో మీ స్థానిక కృషి విజ్ఞాన కేంద్రం (KVK) లేదా వ్యవసాయ విస్తరణాధికారిని (AEO/AAO) సంప్రదించండి.',
      historyTabTitle: 'గత పరీక్షల చరిత్ర',
      liveDiagnosisTabTitle: 'ప్రత్యక్ష AI పరీక్ష',
      historyEmptyTitle: 'ఇంకా ఎలాంటి పరీక్షల రికార్డులు లేవు',
      historyEmptyDesc: 'మీరు పూర్తి చేసి భద్రపరిచిన పంట పరీక్షల వివరాలు ఇక్కడ ఆర్కైవ్ చేయబడతాయి.',
      saveToHistoryButton: 'రికార్డుల్లో భద్రపరచండి',
      savedToHistoryNotice: 'పంట పరీక్ష ఫలితం మీ రికార్డుల్లో విజయవంతంగా భద్రపరచబడింది.',
      deleteHistoryConfirm: 'ఈ రికార్డును ఖచ్చితంగా తొలగించాలనుకుంటున్నారా?',
      historyDetailsTitle: 'పంట పరీక్ష పూర్తి వివరాలు',
      historyDateLabel: 'పరీక్షించిన తేదీ',
      historySymptomsLabel: 'కనిపించే తెగులు లక్షణాలు',
      historyRecommendationsLabel: 'వ్యవసాయ నివారణ చర్యలు & సూచనలు',
      historyConfidenceLabel: 'రోగ నిర్ధారణ కచ్చితత్వం',
      historySeverityLabel: 'తెగులు తీవ్రత',
      viewDetailsButton: 'వివరాలు చూడండి',
      closeModalButton: 'మూసివేయి',
      deleteRecordTitle: 'పరీక్ష రికార్డును తొలగించండి',
      deleteButton: 'తొలగించు',
      cancelButton: 'రద్దు చేయి',
      stepUploading: 'పంట ఫోటోను సురక్షితంగా అప్‌లోడ్ చేస్తోంది...',
      stepIdentifying: 'మొక్క జాతి మరియు వృక్ష లక్షణాలను గుర్తిస్తోంది...',
      stepAnalyzing: 'ఆకు తెగులు మచ్చలు & లక్షణాలను విశ్లేషిస్తోంది...',
      stepRecommendations: 'సేంద్రీయ మరియు వ్యవసాయ నివారణ సలహాలను రూపొందిస్తోంది...',
      stepCompleting: 'పంట పరీక్ష నివేదికను పూర్తి చేస్తోంది...',
      advisorBadge: 'AI పంట పరిష్కార సలహాదారు',
      advisorTitle: 'AI స్మార్ట్ పంట పరిష్కార & కోలుకునే మార్గదర్శి',
      advisorSubtitle: 'వ్యాధి మూల కారణం, తక్షణ పొలం రక్షణ చర్యలు, బయో నివారణ పద్ధతులు మరియు 3-7 రోజుల పర్యవేక్షణ ప్రణాళిక.',
      likelyCauseTitle: 'సమస్యకు సంభావ్య మూల కారణం',
      immediateActionsTitle: 'రైతు వెంటనే తీసుకోవాల్సిన అత్యవసర చర్యలు (24-48 గంటల్లో)',
      recoveryPlanTitle: 'పంట కోలుకునే పర్యవేక్షణ షెడ్యూల్',
      followUp3dLabel: '3వ రోజు పరిశీలనాంశాలు',
      followUp7dLabel: '7వ రోజు పురోగతి సమీక్ష',
      logTreatmentButton: 'చేసిన చికిత్సను నమోదు చేయండి',
      treatmentModalTitle: 'పంట కోలుకునే డైరీలో చికిత్సను నమోదు చేయండి',
      treatmentNameLabel: 'వాడిన మందు / పద్ధతి పేరు',
      treatmentTypeLabel: 'యాజమాన్య పద్ధతి',
      applicationDateLabel: 'పిచికారీ / వాడిన తేదీ',
      dosageOrMethodLabel: 'వాడిన విధానం / పద్ధతి వివరాలు',
      observationsLabel: 'క్షేత్ర గమనికలు & వాతావరణ స్థితి',
      saveTreatmentButton: 'చికిత్సను భద్రపరచండి',
      treatmentSuccessNotice: 'చికిత్స విజయవంతంగా నమోదు చేయబడింది మరియు మీ పంట కోలుకునే రికార్డుకు లింక్ చేయబడింది.',
      treatmentErrorNotice: 'చికిత్స నమోదు విఫలమైంది. దయచేసి వివరాలను పరిశీలించి మళ్లీ ప్రయత్నించండి.',
      treatmentWarningCropMismatch: 'పంట సరిపోలలేదు: పరీక్షించిన పంట ఎంపిక చేసిన పొలంలోని పంటతో సరిపోలలేదు. దయచేసి సరైన నమోదు చేసుకున్న పంటను ఎంచుకోండి లేదా సాధారణ పొలం కింద భద్రపరచండి.',
      treatmentWarningCropBelongsToOtherFarm: 'ఎంచుకున్న పంట మీరు ఎంచుకున్న పొలానికి చెందినది కాదు. దయచేసి పొలం మరియు పంట ఎంపికను సరిచూసుకోండి.',
      chemicalDisclaimerWarning: 'ముఖ్య హెచ్చరిక: AI రసాయన సలహాలు కేవలం శాస్త్రీయ సూచనలు మాత్రమే. ఎటువంటి రసాయన మందులు వాడే ముందైనా స్థానిక వ్యవసాయ విస్తరణాధికారి (AEO/KVK) లేదా డీలర్ వద్ద రిజిస్టర్డ్ ఉత్పత్తి లేబుల్ మార్గదర్శకాలను తప్పనిసరిగా పాటించండి.',
      treatmentSelectFarm: 'వ్యవసాయ క్షేత్రం / పొలం ఎంచుకోండి',
      treatmentAssociatedCrop: 'సంబంధిత పంట',
      treatmentNoLinkedCrop: 'నిర్దిష్ట పంట లేదు (సాధారణ పొలం)',
      treatmentTypeOrganic: 'సేంద్రీయ / బయో పద్ధతి',
      treatmentTypeChemical: 'రసాయన యాజమాన్యం',
      treatmentTypeCultural: 'పొల పరిశుభ్రత / సాగు పద్ధతి',
      treatmentTypeOther: 'ఇతర యాజమాన్యం',
      treatmentStatusMonitoring: 'పర్యవేక్షణలో ఉంది',
      treatmentStatusRecovering: 'కోలుకుంటోంది / మెరుగుపడుతోంది',
      treatmentStatusResolved: 'పూర్తిగా నయమైంది / ఆరోగ్యకరం',
      treatmentStatusNeedsFollowUp: 'మరింత శ్రద్ధ అవసరం / ముదురుతోంది',
      treatmentStatusImproving: 'మెరుగుపడుతోంది',
      treatmentStatusUnchanged: 'మార్పు లేదు',
      treatmentStatusWorsening: 'ముదురుతోంది / వ్యాపిస్తోంది',
      treatmentHistoryTabTitle: 'చికిత్సల డైరీ',
      treatmentHistoryEmptyTitle: 'ఇంకా ఎలాంటి చికిత్సా రికార్డులు లేవు',
      treatmentHistoryEmptyDesc: 'మీరు నమోదు చేసిన పిచికారీలు, సేంద్రీయ చికిత్సలు మరియు కోలుకునే పర్యవేక్షణ వివరాలు ఇక్కడ కనిపిస్తాయి.',
      updateRecoveryStatusTitle: 'పంట కోలుకునే స్థితిని నవీకరించండి',
      saveStatusButton: 'స్థితి & పరిశీలనలను భద్రపరచండి',
      followUpCheckpointsTitle: 'షెడ్యూల్ చేసిన తదుపరి పరిశీలనా దినాలు',
      diagnosisLinkedBadge: 'AI పరీక్షకు లింక్ చేయబడింది',
      cropMatchedBadge: 'పరీక్షించిన పంట ధృవీకరించబడింది',
      generalFieldLabel: 'సాధారణ క్షేత్రం / కేటాయించనిది',
      errInvalidFile: 'దయచేసి సరైన ఇమేజ్ ఫార్మాట్ (JPEG, PNG, WEBP) ను అప్‌లోడ్ చేయండి.',
      errFileLimit: 'ఇమేజ్ పరిమాణం 10MB పరిమితిని మించిపోయింది. దయచేసి చిన్న ఫోటోను అప్‌లోడ్ చేయండి.',
      errGeneric: 'పరీక్ష విఫలమైంది. దయచేసి స్పష్టమైన ఫోటోతో మళ్లీ ప్రయత్నించండి.',
    },
    aboutSection: {
      badge: 'కృషారక్షక్ AI గురించి',
      title: 'ఆచరణాత్మక సమాచారంతో రైతుల సాధికారత',
      description:
        'కృషారక్షక్ AI అనేది పంటలను సంరక్షించడానికి, శీతోష్ణస్థితి ఒత్తిళ్లను ముందుగానే అంచనా వేయడానికి మరియు వ్యవసాయ కుటుంబాలకు మెరుగైన దిగుబడులను అందించడానికి రూపొందించబడిన ఆధునిక వ్యవసాయ వేదిక.',
      missionTitle: 'మా లక్ష్యం',
      missionDesc:
        'అత్యాధునిక కంప్యూటర్ విజన్, వాతావరణ నమూనాలు మరియు క్షేత్రస్థాయి వ్యవసాయం మధ్య అంతరాన్ని తగ్గించి, ప్రతి రైతుకు నిపుణుల సలహాలను అందుబాటులోకి తీసుకురావడం.',
      decisionTitle: 'ఖచ్చితమైన వ్యవసాయ నిర్ణయాలు',
      decisionDesc:
        'ఆకుల తెగులు లక్షణాలను గుర్తించడం నుండి అధిక వేడి లేదా భారీ వర్షాల సమయంలో సాగునీటి నిర్వహణ వరకు, మా AI వేదిక వ్యవసాయంలో అనిశ్చితిని తొలగిస్తుంది.',
      languagesTitle: 'బహుభాషా సౌలభ్యం (English, తెలుగు, हिन्दी)',
      languagesDesc:
        'తెలుగు, హిందీ మరియు ఆంగ్ల వ్యవసాయ పరిభాషతో సహజంగా రూపొందించబడింది, తద్వారా సాంకేతిక పరిజ్ఞానాన్ని ఉపయోగించడంలో భాష అడ్డంకి కాదు.',
    },
    howItWorksSection: {
      badge: 'సులభమైన విధానం',
      title: 'KrishiRakshak AI ఎలా పనిచేస్తుంది',
      description: 'మరింత మెరుగైన వ్యవసాయ నిర్ణయాలు తీసుకోవడానికి నాలుగు సులభమైన దశలు.',
      stepPrefix: 'దశ',
      steps: [
        {
          number: '01',
          title: 'మీ పొలాన్ని నమోదు చేయండి',
          description: 'మీ పొలం ప్రాంతం, విస్తీర్ణం మరియు పంట వివరాలను జోడించండి.',
        },
        {
          number: '02',
          title: 'పంట చిత్రాన్ని అప్‌లోడ్ చేయండి',
          description: 'వ్యాధి సోకిన పంట ఆకు యొక్క స్పష్టమైన ఫోటోను తీయండి.',
        },
        {
          number: '03',
          title: 'AI విశ్లేషణ',
          description: 'సంభావ్య పంట సమస్యలు మరియు వాతావరణ ముప్పులను అర్థం చేసుకోండి.',
        },
        {
          number: '04',
          title: 'స్మార్ట్ సలహాలు పొందండి',
          description: 'మీకు కావలసిన భాషలో ఆచరణాత్మక వ్యవసాయ సలహాలను అందుకోండి.',
        },
      ],
    },
    cropDoctorSection: {
      badge: 'మీ AI క్రాప్ డాక్టర్‌ను కలవండి',
      title: 'సమస్యలు వ్యాపించకముందే మీ పంట ఆరోగ్యాన్ని తెలుసుకోండి',
      description:
        'సమస్య ఉన్న ఆకు యొక్క స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి. మా AI ఆధారిత విశ్లేషణ కనిపించే లక్షణాలను మరియు సంభావ్య పంట ఆరోగ్య సమస్యలను గుర్తించడంలో సహాయపడుతుంది.',
      checklist: [
        'AI ఆధారిత ఆకుల చిత్ర విశ్లేషణ',
        'కనిపించే లక్షణాల గురించి సులభమైన వివరణలు',
        'ఆచరణాత్మక తదుపరి చర్యల సిఫార్సులు',
        'తెలుగు మరియు ఆంగ్లంలో మార్గదర్శకత్వం',
      ],
      ctaButton: 'క్రాప్ డాక్టర్‌ను అన్వేషించండి',
      reportTag: 'పంట ఆరోగ్య నివేదిక',
      reportTitle: 'టమాటా ఆకు విశ్లేషణ',
      sampleBadge: 'నమూనా',
      reportImageAlt: 'టమాటా మొక్క',
      issueLabel: 'సంభావ్య సమస్య',
      issueTitle: 'శిలీంధ్ర ఆకు తెగులు',
      issueDesc:
        'నమూనా పరిశీలన: ఆకుల రంగు మారడం మరియు మచ్చలు ఏర్పడటం శిలీంధ్ర సమస్యను సూచించవచ్చు.',
      recommendationsTitle: 'సిఫార్సు చేయబడిన తదుపరి చర్యలు',
      recommendations: [
        'సమీపంలోని ఇతర ఆకులలో ఇటువంటి లక్షణాలు ఉన్నాయేమో పరిశీలించండి.',
        'ప్రభావిత ప్రాంతం మరింత వ్యాపిస్తోందో లేదో గమనించండి.',
        'ధృవీకరణ కోసం వ్యవసాయ నిపుణుడిని సంప్రదించండి.',
      ],
      disclaimer:
        'ప్రదర్శన కోసం మాత్రమే. ఇది నమూనా సమాచారం మాత్రమే, వాస్తవ AI నిర్ధారణ లేదా ధృవీకరించబడిన స్కోరు కాదు.',
    },
    footer: {
      brandName: 'KrishiRakshak AI',
      tagline:
        'స్మార్ట్ వ్యవసాయం. ముందస్తు హెచ్చరికలు. మెరుగైన పంటలు. ఆధునిక సాంకేతిక పరిజ్ఞానం ద్వారా రైతులు సరైన వ్యవసాయ నిర్ణయాలు తీసుకునేందుకు సహాయపడుతోంది.',
      quickLinksTitle: 'త్వరిత లింకులు',
      quickLinks: {
        home: 'హోమ్',
        features: 'ఫీచర్లు',
        weather: 'వాతావరణ సమాచారం',
        howItWorks: 'ఇది ఎలా పనిచేస్తుంది',
        about: 'మా గురించి',
        dashboard: 'డ్యాష్‌బోర్డ్',
        login: 'లాగిన్',
      },
      platformTitle: 'మా ప్లాట్‌ఫారమ్',
      platformItems: [
        'AI క్రాప్ డాక్టర్',
        'వాతావరణ సమాచారం',
        'పంట నష్ట భయాల అంచనా',
        'AI రైతు సహాయకుడు',
      ],
      copyright: '© 2026 KrishiRakshak AI. స్మార్ట్ వ్యవసాయం కోసం రూపొందించబడింది.',
    },
  },
  hi: {
  "nav": {
    "brandName": "कृषिरक्षक",
    "brandSubtitle": "AI · स्मार्ट कृषि",
    "home": "होम",
    "features": "विशेषताएं",
    "weather": "मौसम",
    "howItWorks": "यह कैसे काम करता है",
    "about": "हमारे बारे में",
    "currentLanguageLabel": "हिन्दी",
    "login": "लॉग इन",
    "register": "पंजीकरण",
    "dashboard": "डैशबोर्ड",
    "profile": "प्रोफ़ाइल",
    "logout": "लॉग आउट",
    "getStarted": "शुरू करें",
    "toggleMenuAria": "नेविगेशन टॉगल करें"
  },
  "hero": {
    "badge": "AI संचालित कृषि प्रणाली",
    "title": "स्मार्ट खेती। पूर्व चेतावनी। बेहतर पैदावार।",
    "description": "AI-आधारित फसल रोग पहचान, लाइव मौसम पूर्वानुमान और अपनी भाषा में कृषि मार्गदर्शन के साथ अपनी फसलों की रक्षा करें।",
    "getStarted": "शुरू करें",
    "exploreFeatures": "विशेषताएं देखें",
    "cropAssessmentBadge": "AI फसल जांच",
    "weatherIntelligenceBadge": "मौसम इंटेलिजेंस",
    "floatingDoctorTitle": "AI क्रॉप डॉक्टर",
    "floatingDoctorDesc": "सटीक फसल स्वास्थ्य विश्लेषण",
    "floatingSmartTitle": "स्मार्ट खेती",
    "floatingSmartDesc": "सटीक कृषि निर्णय",
    "heroImageAlt": "कृषि खेत"
  },
  "quickHighlights": [
    {
      "title": "AI क्रॉप डॉक्टर",
      "desc": "संभावित फसल रोगों की पहचान करें"
    },
    {
      "title": "मौसम इंटेलिजेंस",
      "desc": "खेत स्तर पर मौसम की निगरानी करें"
    },
    {
      "title": "फसल जोखिम चेतावनी",
      "desc": "पर्यावरणीय जोखिमों का पूर्व आकलन करें"
    }
  ],
  "featuresSection": {
    "badge": "हमारी विशेषताएं",
    "title": "आपके खेत की हर ज़रूरत, एक ही मंच पर",
    "description": "किसानों की मदद के लिए डिज़ाइन किए गए स्मार्ट टूल्स, जो जोखिम कम कर पैदावार बढ़ाते हैं।",
    "cards": [
      {
        "title": "AI क्रॉप डॉक्टर",
        "description": "पत्ते की तस्वीर से रोगों की त्वरित पहचान और रोकथाम के जैविक उपाय प्राप्त करें।"
      },
      {
        "title": "हाइपरलोकल मौसम",
        "description": "अपने खेत के लिए सटीक वर्षा, तापमान और आर्द्रता का 7-दिवसीय पूर्वानुमान देखें।"
      },
      {
        "title": "स्मार्ट जोखिम अलर्ट",
        "description": "अतिवृष्टि, सूखा और कीट प्रकोप के प्रति स्वचालित पूर्व चेतावनी प्राप्त करें।"
      },
      {
        "title": "फसल एवं खेत प्रबंधन",
        "description": "अपने खेतों, बुवाई तिथियों और कृषि कार्यों का व्यवस्थित रिकॉर्ड रखें।"
      }
    ]
  },
  "weather": {
    "dashboard": {
      "badge": "खेत मौसम पूर्वानुमान",
      "title": "हाइपरलोकल कृषि मौसम अवलोकन",
      "description": "सटीक उपग्रह और मौसम स्टेशन डेटा द्वारा संचालित वास्तविक समय कृषि मौसम विज्ञान।",
      "loadingTitle": "खेत का मौसम लोड हो रहा है...",
      "loadingDesc": "मौसम पूर्वानुमान और कृषि जोखिम संकेतकों को संकलित किया जा रहा है...",
      "errorHeader": "मौसम डेटा लोड करने में असमर्थ",
      "retryButton": "पुनः प्रयास करें",
      "invalidCoordinates": "अमान्य भौगोलिक निर्देशांक। कृपया अपने खेत का स्थान पुनः चुनें।",
      "fetchErrorGeneric": "लाइव मौसम डेटा प्राप्त नहीं हो सका। कृपया बाद में प्रयास करें।",
      "apiServerError": "मौसम सेवा अस्थायी रूप से अनुपलब्ध है। कृपया कुछ क्षण बाद पुनः प्रयास करें।",
      "apiTimeoutError": "अनुरोध समय समाप्त। कृपया अपना इंटरनेट कनेक्शन जांचें।",
      "offlineError": "नेटवर्क कनेक्शन अनुपलब्ध है। कृपया अपने इंटरनेट की जांच करें।"
    },
    "location": {
      "badge": "खेत स्थान निर्धारण",
      "title": "स्थान चुनें या GPS का उपयोग करें",
      "subtitle": "सटीक मौसम पूर्वानुमान प्राप्त करने के लिए अपने खेत का स्थान पिन करें।",
      "useGpsButton": "वर्तमान GPS स्थान प्राप्त करें",
      "gpsLocating": "GPS से खोजा जा रहा है...",
      "hideMapButton": "मानचित्र छिपाएं",
      "showMapButton": "मानचित्र दिखाएं",
      "mapInstruction": "खेत के निर्देशांक सेट करने के लिए मानचित्र पर कहीं भी क्लिक करें।",
      "coordinatesLabel": "स्थान निर्देशांक:",
      "confirmButton": "इस स्थान की पुष्टि करें",
      "confirmedButton": "स्थान निर्धारित है",
      "activeLocationLabel": "वर्तमान सक्रिय स्थान:",
      "noLocationYet": "कोई स्थान नहीं चुना गया है",
      "gpsLocatedName": "GPS द्वारा निर्धारित स्थान",
      "mapSelectedName": "मानचित्र पर चयनित स्थान",
      "gpsNoticeTitle": "GPS स्थान सूचना",
      "gpsErrorPermission": "स्थान अनुमति अस्वीकृत। कृपया ब्राउज़र सेटिंग्स में स्थान सक्षम करें।",
      "gpsErrorUnavailable": "स्थान जानकारी अनुपलब्ध है। कृपया मानचित्र का उपयोग करें।",
      "gpsErrorTimeout": "स्थान प्राप्त करने का समय समाप्त हुआ। पुनः प्रयास करें।",
      "gpsErrorUnsupported": "आपका ब्राउज़र GPS स्थान का समर्थन नहीं करता है।"
    },
    "current": {
      "locationLabel": "खेत स्थान",
      "lastUpdated": "अंतिम अपडेट",
      "feelsLike": "महसूस तापमान",
      "feelsLikeShort": "महसूस",
      "humidity": "सापेक्ष आर्द्रता",
      "rainfall": "वर्षा (Rainfall)",
      "windSpeed": "हवा की गति",
      "sunrise": "सूर्योदय",
      "sunset": "सूर्यास्त",
      "timezoneLabel": "समय क्षेत्र",
      "temperature": "तापमान"
    },
    "conditions": {
      "partlyCloudy": "आंशिक बादल",
      "overcast": "घने बादल",
      "fog": "कोहरा",
      "drizzle": "बूंदाबांदी",
      "moderateRain": "मध्यम बारिश",
      "heavyRain": "तेज बारिश",
      "thunderstorm": "गरज-चमक के साथ बारिश",
      "snow": "बर्फबारी",
      "clearSky": "Clear Sky",
      "mainlyClear": "Mainly Clear",
      "freezingDrizzle": "Freezing Drizzle",
      "slightRain": "Slight Rain",
      "freezingRain": "Freezing Rain",
      "rainShowers": "Rain Showers",
      "violentRainShowers": "Violent Rain Showers",
      "snowShowers": "Snow Showers",
      "thunderstormWithHail": "Thunderstorm with Hail"
    },
    "forecast": {
      "badge": "पूर्वानुमान इंटेलिजेंस",
      "title": "आगामी 24 घंटे और 7 दिनों का पूर्वानुमान",
      "subtitle": "आत्मविश्वास के साथ योजना बनाने के लिए प्रति घंटा तापमान और 7-दिवसीय दृष्टिकोण।",
      "tabHourly": "24 घंटे प्रति घंटा",
      "tabDaily": "7-दिवसीय दृष्टिकोण",
      "hourlyChartTitle": "24 घंटे का तापमान और वर्षा संभावना वक्र",
      "tempLegend": "तापमान",
      "rainLegend": "वर्षा की संभावना",
      "rainChance": "बारिश की संभावना",
      "days": {
        "today": "आज",
        "tomorrow": "कल",
        "sunday": "रवि",
        "monday": "सोम",
        "tuesday": "मंगल",
        "wednesday": "बुध",
        "thursday": "गुरु",
        "friday": "शुक्र",
        "saturday": "शनि"
      }
    },
    "risk": {
      "badge": "प्रारंभिक जोखिम इंजन",
      "title": "फसल मौसम जोखिम संकेतक",
      "subtitle": "प्रमुख पर्यावरणीय तनाव कारकों का स्वचालित मौसम मूल्यांकन।",
      "overallStatusLabel": "समग्र स्थिति",
      "severityLow": "अनुकूल (कम जोखिम)",
      "severityModerate": "सावधानी (मध्यम जोखिम)",
      "severityHigh": "चेतावनी (उच्च जोखिम)",
      "metricLabel": "पूर्वानुमान मीट्रिक",
      "thresholdLabel": "वैज्ञानिक सीमा",
      "advisoryHeader": "प्रारंभिक कृषि सलाह",
      "disclaimerText": "सूचना: ये मौसम सीमा पर आधारित प्रारंभिक संकेतक हैं, निश्चित फसल हानि की भविष्यवाणी नहीं।",
      "riskSummaryLow": "वर्तमान और पूर्वानुमानित स्थितियां सामान्य कृषि कार्यों के लिए अनुकूल हैं।",
      "riskSummaryModerate": "मौसम में बदलाव देखा गया है। खेत की जलनिकासी और छिड़काव समय पर नजर रखें।",
      "riskSummaryHigh": "मौसम अलर्ट सक्रिय हैं। अनुशंसित सुरक्षात्मक उपाय तत्काल लागू करें।",
      "riskRainHeavyTitle": "भारी बारिश की चेतावनी",
      "riskRainHeavyDesc": "50 मिमी से अधिक तीव्र वर्षा का पूर्वानुमान। जलभराव और जड़ सड़न का खतरा।",
      "riskRainHeavyAdv": "खेत की जलनिकासी नालियां साफ करें। उर्वरक छिड़काव और कीटनाशक स्थगित करें।",
      "riskRainModerateTitle": "मध्यम बारिश की संभावना",
      "riskRainModerateDesc": "मध्यम फुहारों की संभावना। मिट्टी की नमी के लिए उपयोगी, निचले हिस्सों में नजर रखें।",
      "riskRainModerateAdv": "खेत की मेड़ों और जल निकासी आउटलेट की जांच करें। गैर-जरूरी छिड़काव रोकें।",
      "riskRainLowTitle": "सामान्य वर्षा स्थिति",
      "riskRainLowDesc": "हल्की या नगण्य वर्षा का पूर्वानुमान। नियमित कार्यों के लिए अनुकूल।",
      "riskRainLowAdv": "मिट्टी की नमी के आधार पर निर्धारित सिंचाई और कृषि कार्यों को आगे बढ़ाएं।",
      "riskTempHighTitle": "अत्यधिक तापमान की चेतावनी",
      "riskTempHighDesc": "अत्यधिक गर्मी का तनाव। तेज वाष्पीकरण से फूल झड़ने या मुरझाने का खतरा।",
      "riskTempHighAdv": "सुबह जल्दी या देर शाम हल्की सिंचाई करें। नमी बनाए रखने के लिए मल्चिंग करें।",
      "riskTempModerateTitle": "दिन का तापमान अधिक",
      "riskTempModerateDesc": "गर्म मौसम, जिससे उथली मिट्टी में नमी तेजी से घट सकती है।",
      "riskTempModerateAdv": "मिट्टी की नमी की नियमित निगरानी करें; दोपहर की गर्मी से पहले सिंचाई करें।",
      "riskTempLowTitle": "अनुकूल तापमान सीमा",
      "riskTempLowDesc": "तापमान क्षेत्रीय फसलों के वानस्पतिक विकास के लिए अनुकूल है।",
      "riskTempLowAdv": "सामान्य फसल विकास परिस्थितियां। नियमित फसल प्रबंधन जारी रखें।",
      "riskHumidityHighTitle": "उच्च आर्द्रता चेतावनी",
      "riskHumidityHighDesc": "लगातार उच्च आर्द्रता फंगल रोगों और बीजाणुओं के प्रसार के लिए अनुकूल है।",
      "riskHumidityHighAdv": "फसल में हवा का संचार सुनिश्चित करें। निचले पत्तों पर फंगल धब्बों की जांच करें।",
      "riskHumidityModerateTitle": "मध्यम आर्द्रता स्तर",
      "riskHumidityModerateDesc": "मध्यम आर्द्र स्थिति। लगातार बादलों के दौरान फसल स्वास्थ्य पर नजर रखें।",
      "riskHumidityModerateAdv": "खेत में वायु संचार बनाए रखें। देर दोपहर में पत्तियों को गीला करने से बचें।",
      "riskHumidityLowTitle": "सामान्य आर्द्रता स्तर",
      "riskHumidityLowDesc": "सापेक्ष आर्द्रता सामान्य है। नमी जनित रोगों का जोखिम बहुत कम है।",
      "riskHumidityLowAdv": "सूखी फसल चंदवा सामान्य स्वास्थ्य और खेत में छिड़काव के लिए अनुकूल है।",
      "riskWindHighTitle": "तेज हवा की चेतावनी",
      "riskWindHighDesc": "तेज हवा के झोंकों से लंबी फसलों (मक्का, केला, गन्ना) के गिरने का खतरा।",
      "riskWindHighAdv": "कमजोर फसलों को सहारा दें। नर्सरी नेट सुरक्षित करें और छिड़काव से बचें।",
      "riskWindModerateTitle": "हवा की मध्यम गति",
      "riskWindModerateDesc": "मध्यम हवा चल रही है। खेत में छिड़काव के दौरान दवा बहने का जोखिम।",
      "riskWindModerateAdv": "हवा शांत होने तक शाकनाशी और कीटनाशक छिड़काव टालें।",
      "riskWindLowTitle": "शांत हवा की स्थिति",
      "riskWindLowDesc": "हल्की हवा की स्थिति। खड़ी फसलों पर न्यूनतम तनाव।",
      "riskWindLowAdv": "पत्तियों पर छिड़काव और मशीनरी संचालन के लिए आदर्श मौसम।"
    }
  },
  "auth": {
    "loginTitle": "किसान लॉग इन",
    "loginSubtitle": "अपने खेत की जानकारी और सलाह देखने के लिए साइन इन करें",
    "registerTitle": "किसान पंजीकरण",
    "registerSubtitle": "फसल सुरक्षा के लिए अपना खाता बनाएं",
    "forgotPasswordTitle": "पासवर्ड भूल गए",
    "forgotPasswordSubtitle": "पुनर्प्राप्ति लिंक प्राप्त करने के लिए अपना ईमेल दर्ज करें",
    "resetPasswordTitle": "नया पासवर्ड सेट करें",
    "resetPasswordSubtitle": "नीचे अपना नया सुरक्षित पासवर्ड दर्ज करें",
    "fullName": "पूरा नाम",
    "fullNamePlaceholder": "उदा. रमेश कुमार",
    "email": "ईमेल पता",
    "emailPlaceholder": "farmer@example.com",
    "phone": "मोबाइल नंबर",
    "phonePlaceholder": "10-अंकीय मोबाइल नंबर",
    "password": "पासवर्ड",
    "passwordPlaceholder": "कम से कम 6 अक्षर",
    "confirmPassword": "पासवर्ड की पुष्टि करें",
    "confirmPasswordPlaceholder": "अपना पासवर्ड पुनः दर्ज करें",
    "newPassword": "नया पासवर्ड",
    "newPasswordPlaceholder": "कम से कम 6 अक्षर",
    "village": "गांव / कस्बा",
    "villagePlaceholder": "उदा. रामपुर",
    "district": "जिला",
    "districtPlaceholder": "उदा. वाराणसी",
    "state": "राज्य",
    "statePlaceholder": "उदा. उत्तर प्रदेश",
    "loginButton": "लॉग इन करें",
    "registerButton": "पंजीकरण करें",
    "registering": "खाता बनाया जा रहा है...",
    "sendResetLink": "पासवर्ड रीसेट लिंक भेजें",
    "noAccount": "क्या आपके पास खाता नहीं है?",
    "rememberMe": "Keep me signed in",
    "forgotPasswordLink": "Forgot password?",
    "updatePasswordButton": "Update Password",
    "backToLogin": "Back to Sign In",
    "haveAccount": "Already registered?",
    "registerNow": "Register here",
    "loginNow": "Sign in here",
    "errRequired": "This field is required",
    "errEmail": "Please enter a valid email address",
    "errPhone": "Please enter a valid 10-digit Indian mobile number",
    "errPasswordMin": "Password must be at least 6 characters",
    "errPasswordMatch": "Passwords do not match",
    "errGeneric": "Authentication failed. Please verify your details.",
    "regSuccessVerification": "Registration successful! A verification email has been sent. Please confirm your email before logging in.",
    "resetEmailSent": "Password recovery email sent. Please check your inbox.",
    "passwordResetSuccess": "Password updated successfully! You can now log in.",
    "signingIn": "Signing in...",
    "sending": "Sending email...",
    "updating": "Updating...",
    "continueWithGoogle": "Google के साथ जारी रखें",
    "signUpWithGoogle": "Google से साइन अप करें",
    "orContinueWith": "या Google के साथ जारी रखें"
  },
  "dashboard": {
    "welcome": "स्वागत है",
    "activeProtection": "सक्रिय फसल सुरक्षा चालू",
    "sidebar": {
      "dashboard": "डैशबोर्ड",
      "cropDoctor": "AI क्रॉप डॉक्टर",
      "weather": "मौसम इंटेलिजेंस",
      "profile": "किसान प्रोफ़ाइल",
      "logout": "लॉग आउट",
      "myFarm": "My Farm",
      "cropManagement": "Crop Management",
      "farmActivities": "Farm Activities",
      "settings": "Settings"
    },
    "title": "Farmer Dashboard",
    "tagline": "Your personalized smart agriculture and farm intelligence portal",
    "profileSummary": "Farmer Profile",
    "editProfile": "Edit Profile",
    "emailLabel": "Email",
    "phoneLabel": "Mobile",
    "locationLabel": "Location",
    "memberSince": "Member Since",
    "weatherCardTitle": "Live Farm Weather",
    "weatherCardDesc": "Hyperlocal forecast & environmental risk assessment",
    "viewWeather": "Explore Weather Module",
    "cropDoctorTitle": "AI Crop Doctor",
    "cropDoctorDesc": "Scan leaves to detect visible crop disease symptoms early",
    "startScan": "Open Crop Doctor",
    "recentActivityTitle": "Recent Crop & Farm Activity",
    "noActivity": "No crop scans or farm activities recorded yet.",
    "logout": "Sign Out",
    "quickStatsFarms": "Registered Farms",
    "quickStatsScans": "Crop Health Checks",
    "quickStatsStatus": "Protection Status",
    "totalLandArea": "Total Cultivated Land",
    "activeCrops": "Active Crops",
    "emptyFarmTitle": "Your farm journey starts here.",
    "emptyFarmDesc": "Register your agricultural plot to unlock tailored weather intelligence, crop tracking, and disease monitoring.",
    "registerFirstFarm": "Register Your First Farm"
  },
  "farm": {
    "title": "खेत पंजीकरण एवं भू-स्थान",
    "subtitle": "मौसम अलर्ट और फसल निगरानी के लिए अपने कृषि भूखंड जोड़ें",
    "editFarm": "खेत विवरण संपादित करें",
    "deleteFarm": "खेत हटाएं",
    "farmName": "खेत का नाम",
    "farmNamePlaceholder": "उदा. उत्तर का खेत या नहर वाला प्लॉट",
    "soilType": "मिट्टी का प्रकार",
    "waterSource": "सिंचाई का मुख्य स्रोत",
    "waterSourcePlaceholder": "उदा. नलकूप या नहर",
    "description": "विवरण / नोट्स",
    "descriptionPlaceholder": "खेत की स्थलाकृति, ढलान या बाड़ के बारे में अतिरिक्त जानकारी...",
    "locationCoordinates": "भौगोलिक निर्देशांक (GPS)",
    "latitude": "अक्षांश (Latitude)",
    "longitude": "देशांतर (Longitude)",
    "detectGps": "वर्तमान स्थान प्राप्त करें (GPS)",
    "gpsDetecting": "GPS से स्थान खोजा जा रहा है...",
    "pinLocationMap": "मानचित्र पर खेत चुनें",
    "selectOnMap": "खेत के सटीक निर्देशांक चुनने के लिए मानचित्र पर क्लिक करें",
    "emptyTitle": "अभी तक कोई खेत पंजीकृत नहीं है",
    "emptyDesc": "मौसम पूर्वानुमान और जोखिम ट्रैकिंग सक्रिय करने के लिए अपना पहला खेत जोड़ें।",
    "addFirstFarm": "पहला खेत पंजीकृत करें",
    "saveSuccess": "खेत का विवरण सफलतापूर्वक सहेजा गया!",
    "updateSuccess": "खेत का विवरण सफलतापूर्वक अपडेट किया गया!",
    "deleteSuccess": "खेत सफलतापूर्वक हटा दिया गया।",
    "saveError": "खेत सहेजने में विफल। कृपया फ़ील्ड जांचें और पुनः प्रयास करें।",
    "registerNewFarm": "Register New Farm",
    "confirmDeleteTitle": "Delete Farm Record?",
    "confirmDeleteBody": "Are you sure you want to delete this farm? All associated crop records and farm activities will also be removed.",
    "saveFarm": "Save Farm Details",
    "saving": "Saving Farm...",
    "village": "Village / Locality",
    "villagePlaceholder": "e.g. Gudivada",
    "district": "District",
    "districtPlaceholder": "e.g. Krishna",
    "state": "State",
    "statePlaceholder": "e.g. Andhra Pradesh",
    "landArea": "Total Land Area",
    "landAreaPlaceholder": "e.g. 5.5",
    "landAreaUnit": "Land Area Unit",
    "irrigationType": "Irrigation Type"
  },
  "crops": {
    "title": "फसल प्रबंधन",
    "subtitle": "सक्रिय फसलों, विकास चरणों और संभावित कटाई की निगरानी करें",
    "addCrop": "नई फसल जोड़ें",
    "editCrop": "फसल संपादित करें",
    "deleteCrop": "फसल हटाएं",
    "confirmDelete": "क्या आप निश्चित रूप से इस फसल रिकॉर्ड को हटाना चाहते हैं?",
    "selectFarm": "खेत चुनें",
    "cropName": "फसल का नाम",
    "cropVariety": "किस्म / हाइब्रिड",
    "sowingDate": "बुवाई की तारीख",
    "expectedHarvestDate": "संभावित कटाई तिथि",
    "cultivatedArea": "खेती का रकबा (एकड़)",
    "growthStage": "फसल का चरण",
    "irrigationMethod": "सिंचाई विधि",
    "notes": "खेत नोट्स",
    "saveCrop": "फसल रिकॉर्ड सहेजें",
    "saving": "सहेजा जा रहा है...",
    "emptyTitle": "कोई फसल पंजीकृत नहीं है",
    "emptyDesc": "स्वास्थ्य निगरानी और कटाई कार्यक्रम के लिए फसल रिकॉर्ड जोड़ें।",
    "addFirstCrop": "अपनी पहली फसल जोड़ें",
    "saveSuccess": "फसल रिकॉर्ड सफलतापूर्वक सहेजा गया!",
    "deleteSuccess": "फसल रिकॉर्ड सफलतापूर्वक हटा दिया गया।"
  },
  "activities": {
    "title": "कृषि कार्य लॉग",
    "subtitle": "दैनिक कृषि कार्यों, सिंचाई और छिड़काव का रिकॉर्ड रखें",
    "logActivity": "कार्य दर्ज करें",
    "activityType": "कार्य का प्रकार",
    "activityDate": "कार्य की तारीख",
    "selectFarm": "खेत चुनें",
    "selectCropOptional": "संबंधित फसल (वैकल्पिक)",
    "description": "कार्य का विवरण",
    "descriptionPlaceholder": "उदा. जैविक खाद के साथ 4 घंटे ड्रिप सिंचाई की गई",
    "notes": "टिप्पणी / अवलोकन",
    "notesPlaceholder": "मिट्टी की नमी, खरपतवार या मौसम के बारे में अवलोकन...",
    "saveActivity": "कार्य सहेजें",
    "saving": "सहेजा जा रहा है...",
    "emptyTitle": "कोई कृषि कार्य दर्ज नहीं है",
    "emptyDesc": "सिंचाई, पोषक तत्व और रखरखाव की व्यापक डायरी बनाए रखें।",
    "logFirstActivity": "पहला कार्य दर्ज करें",
    "saveSuccess": "कार्य सफलतापूर्वक दर्ज किया गया!",
    "deleteSuccess": "कार्य प्रविष्टि हटा दी गई।"
  },
  "profile": {
    "title": "किसान प्रोफ़ाइल प्रबंधन",
    "subtitle": "अपने व्यक्तिगत और खेत के विवरण की समीक्षा करें और अपडेट करें",
    "accountInfo": "खाता विवरण",
    "saveButton": "परिवर्तन सहेजें",
    "saving": "सहेजा जा रहा है...",
    "saveSuccess": "आपकी प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई है!",
    "saveError": "प्रोफ़ाइल अपडेट करने में विफल। पुनः प्रयास करें।",
    "backToDashboard": "डैशबोर्ड पर वापस जाएं"
  },
  "cropDoctor": {
    "badge": "AI क्रॉप डॉक्टर",
    "title": "AI फसल रोग पहचान विशेषज्ञ",
    "subtitle": "पौधे या पत्ते की स्पष्ट तस्वीर अपलोड करें। सुरक्षित सुपाबेस एज फंक्शन के माध्यम से गूगल जेमिनी विज़न द्वारा संचालित। यह पहले पौधे की प्रजाति पहचानता है, फिर रोग और लक्षणों का विश्लेषण करता है।",
    "guideButton": "सेटअप और एज फंक्शन गाइड",
    "guideTitle": "सुपाबेस एज फंक्शन आर्किटेक्चर (`crop-diagnosis`)",
    "guideDesc": "आपकी जेमिनी API कुंजी को गोपनीय रखने के लिए विज़न अनुरोध सर्वरलेस एज फंक्शन द्वारा निष्पादित होते हैं:",
    "guideNote": "सुपाबेस डैशबोर्ड में Project Settings > Edge Functions > Secrets के अंतर्गत सीधे GEMINI_API_KEY सेट करें।",
    "errorTitle": "जांच बाधित हुई",
    "uploadCardTitle": "पत्ते या पौधे की फोटो अपलोड करें",
    "uploadCardDesc": "धान (चावल), टमाटर, कपास, मिर्च, मक्का, मूंगफली और अन्य फसलों के लिए उपयोगी। स्पष्ट क्लोज़-अप फोटो लें।",
    "changePhoto": "फोटो बदलें",
    "dropzonePrompt": "फोटो चुनने के लिए यहां क्लिक करें या खींचें",
    "dropzoneHint": "JPG, PNG, WEBP समर्थित (अधिकतम 10MB)",
    "runDiagnosisButton": "AI जांच शुरू करें",
    "analyzingButton": "जेमिनी विज़न द्वारा पौधे की जांच जारी...",
    "guidelinesTitle": "पहचान संबंधी दिशानिर्देश",
    "guideline1": "समानांतर शिराएं और घास जैसी बनावट: धान या मक्का जैसी फसलों को दर्शाती हैं।",
    "guideline2": "संयुक्त पत्तियां: टमाटर और मिर्च जैसी फसलों को कपास और मूंगफली से अलग करती हैं।",
    "guideline3": "स्पष्ट प्रकाश: सुनिश्चित करें कि धब्बे या लक्षण स्पष्ट दिख रहे हों और फ्लैश से धुंधले न हों।",
    "liveIntelTitle": "प्रत्यक्ष जांच रिपोर्ट",
    "defaultAssessment": "AI रोग विश्लेषण",
    "statusCompleted": "विश्लेषण पूर्ण",
    "statusUncertain": "अस्पष्ट विश्लेषण",
    "statusAwaiting": "फोटो की प्रतीक्षा है",
    "taskATitle": "टास्क A · पौधे की प्रजाति पहचान",
    "scientificNamePrefix": "वानस्पतिक वैज्ञानिक नाम",
    "observedTraitsTitle": "देखे गए वानस्पतिक लक्षण:",
    "taskBTitle": "टास्क B · रोग एवं दिखाई देने वाले लक्षण",
    "healthyCropTitle": "स्वस्थ फसल / कोई रोग लक्षण नहीं",
    "observableSymptomsTitle": "दिखाई देने वाले घाव एवं लक्षण:",
    "uncertaintyTitle": "अनिश्चितता सूचना:",
    "uncertaintyMessage": "मॉडल इस फसल या इसके लक्षणों को उच्च निश्चितता के साथ वर्गीकृत नहीं कर सका। फसल सुरक्षा हेतु रासायनिक उपचार नहीं दर्शाए गए हैं। कृपया पौधे की अधिक स्पष्ट और निकट से फोटो लें।",
    "guidanceTitle": "कृषि सलाह एवं आगामी कदम",
    "disclaimerPrefix": "अस्वीकरण:",
    "emptyStateTitle": "कोई सक्रिय जांच उपलब्ध नहीं है",
    "emptyStateDesc": "बाईं ओर किसी फसल की पत्ती की तस्वीर अपलोड करें और जांच शुरू करने के लिए \"AI जांच शुरू करें\" पर टैप करें।",
    "analyzingTitle": "पौधे की आकृति का विश्लेषण हो रहा है...",
    "analyzingDesc": "जेमिनी विज़न वानस्पतिक विशेषताओं और पत्ती पर घावों के पैटर्न की जांच कर रहा है।",
    "translatingNotice": "परिणामों का अनुवाद किया जा रहा है...",
    "translationFailedNotice": "अनुवाद लोड नहीं हो सका। मूल अंग्रेजी रिपोर्ट प्रदर्शित की जा रही है।",
    "confidenceHigh": "उच्च",
    "confidenceModerate": "मध्यम",
    "confidenceLow": "कम / अनिश्चित",
    "severityLabel": "रोग की तीव्रता",
    "severityLow": "कम / सामान्य",
    "severityMedium": "मध्यम (उपचार आवश्यक)",
    "severityHigh": "गंभीर (तत्काल ध्यान दें)",
    "organicTreatmentsTitle": "जैविक एवं प्राकृतिक उपचार",
    "chemicalTreatmentsTitle": "लक्षित रासायनिक प्रबंधन (सावधानीपूर्वक)",
    "preventionTitle": "दीर्घकालिक रोकथाम एवं कृषि पद्धतियां",
    "expertConsultTitle": "कृषि विशेषज्ञ से कब संपर्क करें",
    "expertConsultDesc": "यदि लक्षण 48-72 घंटों में खेत के 20% से अधिक हिस्से में फैल जाएं, या गंभीर मुरझान दिखे, तो तुरंत पत्ती के नमूने के साथ अपने नजदीकी कृषि विज्ञान केंद्र (KVK) या कृषि अधिकारी से संपर्क करें।",
    "historyTabTitle": "जांच इतिहास",
    "liveDiagnosisTabTitle": "लाइव AI जांच",
    "historyEmptyTitle": "अभी तक कोई जांच रिकॉर्ड नहीं है",
    "historyEmptyDesc": "आपके द्वारा पूरी और सहेजी गई जांचों का रिकॉर्ड मौसमी तुलना के लिए यहां सुरक्षित रहेगा।",
    "saveToHistoryButton": "रिकॉर्ड में सहेजें",
    "savedToHistoryNotice": "जांच रिपोर्ट आपके खेत रिकॉर्ड में सफलतापूर्वक सहेज ली गई है।",
    "deleteHistoryConfirm": "क्या आप निश्चित रूप से इस जांच रिकॉर्ड को हटाना चाहते हैं?",
    "historyDetailsTitle": "जांच विवरण",
    "historyDateLabel": "जांच की तारीख",
    "historySymptomsLabel": "दिखाई देने वाले लक्षण",
    "historyRecommendationsLabel": "कृषि संबंधी सिफारिशें",
    "historyConfidenceLabel": "जांच की विश्वसनीयता",
    "historySeverityLabel": "रोग की तीव्रता",
    "viewDetailsButton": "विवरण देखें",
    "closeModalButton": "बंद करें",
    "deleteRecordTitle": "जांच रिकॉर्ड हटाएं",
    "deleteButton": "हटाएं",
    "cancelButton": "रद्द करें",
    "stepUploading": "फसल की फोटो सुरक्षित रूप से अपलोड हो रही है...",
    "stepIdentifying": "पौधे की प्रजाति और वानस्पतिक लक्षणों की पहचान जारी...",
    "stepAnalyzing": "पत्ती के रोगों और घावों का विश्लेषण किया जा रहा है...",
    "stepRecommendations": "जैविक और कृषि मार्गदर्शन तैयार हो रहा है...",
    "stepCompleting": "जांच रिपोर्ट को अंतिम रूप दिया जा रहा है...",
    "advisorBadge": "AI क्रॉप सॉल्यूशन एडवाइज़र",
    "advisorTitle": "स्मार्ट फसल समाधान एवं सुधार मार्गदर्शिका",
    "advisorSubtitle": "रोग का मूल कारण, तत्काल खेत सुरक्षा उपाय, जैविक उपचार और 3 से 7 दिनों की सुधार योजना।",
    "likelyCauseTitle": "संभावित मूल कारण",
    "immediateActionsTitle": "तत्काल आवश्यक कदम (अगले 24-48 घंटों में)",
    "recoveryPlanTitle": "सुधार निगरानी एवं फॉलो-अप कार्यक्रम",
    "followUp3dLabel": "तीसरा दिन (Day 3) चेकपॉइंट",
    "followUp7dLabel": "सातवां दिन (Day 7) सुधार मूल्यांकन",
    "logTreatmentButton": "किया गया उपचार दर्ज करें",
    "treatmentModalTitle": "फसल सुधार डायरी में उपचार दर्ज करें",
    "treatmentNameLabel": "दवा / उपचार का नाम",
    "treatmentTypeLabel": "प्रबंधन विधि",
    "applicationDateLabel": "उपचार की तारीख",
    "dosageOrMethodLabel": "उपयोग विधि / पानी का अनुपात",
    "observationsLabel": "खेत नोट्स एवं मौसम की स्थिति",
    "saveTreatmentButton": "उपचार खेत लॉग में सहेजें",
    "treatmentSuccessNotice": "उपचार सफलतापूर्वक दर्ज कर लिया गया और आपकी फसल सुधार डायरी से लिंक हो गया।",
    "treatmentErrorNotice": "उपचार दर्ज करने में विफल। कृपया फ़ील्ड जांचें और पुनः प्रयास करें।",
    "treatmentWarningCropMismatch": "फसल बेमेल चेतावनी: जांची गई फसल चयनित खेत की फसल से मेल नहीं खाती। कृपया सही पंजीकृत फसल चुनें या सामान्य खेत में सहेजें।",
    "treatmentWarningCropBelongsToOtherFarm": "चयनित फसल इस चुने हुए खेत की नहीं है। कृपया खेत और फसल का चयन पुनः जांचें।",
    "chemicalDisclaimerWarning": "सुरक्षा सलाह: AI रासायनिक सुझाव केवल वैज्ञानिक सक्रिय घटक हैं। किसी भी रसायन के छिड़काव से पहले हमेशा स्थानीय कृषि विस्तार अधिकारी (KVK/AAO) से परामर्श लें और उत्पाद के लेबल निर्देशों का पालन करें।",
    "treatmentSelectFarm": "खेत का चयन करें",
    "treatmentAssociatedCrop": "संबंधित फसल",
    "treatmentNoLinkedCrop": "कोई विशिष्ट फसल नहीं (सामान्य खेत)",
    "treatmentTypeOrganic": "जैविक / बायो-कंट्रोल",
    "treatmentTypeChemical": "रासायनिक प्रबंधन",
    "treatmentTypeCultural": "स्वच्छता एवं कृषि पद्धतियां",
    "treatmentTypeOther": "अन्य प्रबंधन",
    "treatmentStatusMonitoring": "निगरानी में",
    "treatmentStatusRecovering": "सुधार हो रहा है",
    "treatmentStatusResolved": "पूरी तरह ठीक / स्वस्थ",
    "treatmentStatusNeedsFollowUp": "अधिक ध्यान आवश्यक / रोग बढ़ रहा है",
    "treatmentStatusImproving": "सुधार हो रहा है",
    "treatmentStatusUnchanged": "कोई बदलाव नहीं",
    "treatmentStatusWorsening": "रोग बढ़ रहा है",
    "treatmentHistoryTabTitle": "उपचार डायरी",
    "treatmentHistoryEmptyTitle": "अभी तक कोई उपचार रिकॉर्ड नहीं है",
    "treatmentHistoryEmptyDesc": "आपके द्वारा किए गए छिड़काव, जैविक उपचार और फॉलो-अप निगरानी रिकॉर्ड यहां दिखाई देंगे।",
    "updateRecoveryStatusTitle": "फसल सुधार की स्थिति अपडेट करें",
    "saveStatusButton": "स्थिति एवं अवलोकन सहेजें",
    "followUpCheckpointsTitle": "निर्धारित फॉलो-अप चेकपॉइंट",
    "diagnosisLinkedBadge": "AI जांच से संबद्ध",
    "cropMatchedBadge": "जांची गई फसल सत्यापित",
    "generalFieldLabel": "सामान्य खेत / अनियत",
    "errInvalidFile": "कृपया मान्य छवि प्रारूप (JPEG, PNG, WEBP) अपलोड करें।",
    "errFileLimit": "फोटो का आकार 10MB की सीमा से अधिक है। कृपया छोटी फोटो अपलोड करें।",
    "errGeneric": "जांच विफल रही। कृपया अधिक स्पष्ट फोटो के साथ पुनः प्रयास करें।"
  },
  "aboutSection": {
    "badge": "कृषिरक्षक AI के बारे में",
    "title": "सटीक जानकारी से किसानों का सशक्तिकरण",
    "description": "कृषिरक्षक AI एक आधुनिक कृषि प्लेटफॉर्म है जिसे खड़ी फसलों की सुरक्षा, जलवायु तनाव का पूर्वानुमान और कृषि परिवारों को बेहतर पैदावार देने के लिए तैयार किया गया है।",
    "missionTitle": "हमारा उद्देश्य",
    "missionDesc": "उन्नत कंप्यूटर विज़न और मौसम संबंधी मॉडलों को ग्रामीण कृषि से जोड़ना, ताकि प्रत्येक किसान को विशेषज्ञ कृषि सलाह सुलभ हो सके।",
    "decisionTitle": "सटीक कृषि निर्णय",
    "decisionDesc": "पत्तियों के रोग लक्षणों की पहचान से लेकर लाइव मौसम के आधार पर सिंचाई और छिड़काव की सलाह तक, हमारा AI खेत में अनिश्चितता को दूर करता है।",
    "languagesTitle": "बहुभाषी सहायता (English, తెలుగు, हिन्दी)",
    "languagesDesc": "प्राकृतिक हिन्दी, तेलुगु और अंग्रेजी शब्दावली के साथ निर्मित, ताकि भाषा कभी भी स्मार्ट कृषि तकनीक के उपयोग में बाधा न बने।"
  },
  "howItWorksSection": {
    "badge": "सरल प्रक्रिया",
    "title": "कृषिरक्षक AI कैसे काम करता है",
    "description": "सटीक कृषि निर्णय लेने के लिए चार आसान कदम।",
    "stepPrefix": "चरण",
    "steps": [
      {
        "number": "01",
        "title": "अपना खेत पंजीकृत करें",
        "description": "अपने खेत का स्थान, रकबा और फसल का विवरण जोड़ें।"
      },
      {
        "number": "02",
        "title": "फसल की तस्वीर अपलोड करें",
        "description": "रोगग्रस्त पत्ती या पौधे की स्पष्ट फोटो लें।"
      },
      {
        "number": "03",
        "title": "AI विश्लेषण",
        "description": "संभावित फसल रोगों और मौसम के जोखिमों को समझें।"
      },
      {
        "number": "04",
        "title": "स्मार्ट सलाह प्राप्त करें",
        "description": "अपनी चुनी हुई भाषा में व्यावहारिक और सुरक्षित कृषि सलाह पाएं।"
      }
    ]
  },
  "cropDoctorSection": {
    "badge": "अपने AI क्रॉप डॉक्टर से मिलें",
    "title": "रोग फैलने से पहले अपनी फसल का स्वास्थ्य जानें",
    "description": "प्रभावित पत्ते की स्पष्ट तस्वीर अपलोड करें। हमारा AI दृश्य लक्षणों और संभावित फसल समस्याओं की समय पर पहचान करने में मदद करता है।",
    "checklist": [
      "AI संचालित पत्ती छवि विश्लेषण",
      "दृश्य लक्षणों का सरल और स्पष्ट विवरण",
      "व्यावहारिक और सुरक्षित आगामी कदम",
      "हिन्दी, तेलुगु और अंग्रेजी में मार्गदर्शन"
    ],
    "ctaButton": "क्रॉप डॉक्टर देखें",
    "reportTag": "फसल स्वास्थ्य रिपोर्ट",
    "reportTitle": "टमाटर की पत्ती का विश्लेषण",
    "sampleBadge": "नमूना",
    "reportImageAlt": "टमाटर का पौधा",
    "issueLabel": "संभावित समस्या",
    "issueTitle": "अगेती पत्ती झुलसा (Early Blight)",
    "issueDesc": "नमूना अवलोकन: पत्तियों पर गाढ़े भूरे धब्बे और पीलापन फंगल संक्रमण का संकेत हो सकते हैं।",
    "recommendationsTitle": "सिफारिश किए गए आगामी कदम",
    "recommendations": [
      "आसपास की अन्य पत्तियों में समान लक्षणों की जांच करें।",
      "निचले संक्रमित पत्तों को सावधानीपूर्वक हटा दें।",
      "पुष्टि और उचित उपचार के लिए स्थानीय कृषि विशेषज्ञ से संपर्क करें।"
    ],
    "disclaimer": "केवल प्रदर्शन के लिए। यह एक नमूना जानकारी है, वास्तविक AI जांच नहीं।"
  },
  "footer": {
    "brandName": "KrishiRakshak AI",
    "tagline": "स्मार्ट खेती। पूर्व चेतावनी। बेहतर पैदावार। आधुनिक तकनीक द्वारा किसानों को सही कृषि निर्णय लेने में सशक्त बनाना।",
    "quickLinksTitle": "त्वरित लिंक",
    "quickLinks": {
      "home": "होम",
      "features": "विशेषताएं",
      "weather": "मौसम",
      "howItWorks": "यह कैसे काम करता है",
      "about": "हमारे बारे में",
      "dashboard": "डैशबोर्ड",
      "login": "लॉग इन"
    },
    "platformTitle": "हमारा प्लेटफॉर्म",
    "platformItems": [
      "AI क्रॉप डॉक्टर",
      "मौसम इंटेलिजेंस",
      "फसल जोखिम चेतावनी",
      "AI किसान सहायक"
    ],
    "copyright": "© 2026 KrishiRakshak AI. स्मार्ट कृषि के लिए समर्पित।"
  }
}
};
