module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-junit-reporter') // JUnit Reporter
    ],
    client: {
      jasmine: {
        // You can add configuration options for Jasmine here
      },
      clearContext: false // Leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // Removes duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/demo'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml', 'junit'], // Add JUnit reporter
    junitReporter: {
      outputDir: 'karma-reports', // Directory to save test results
      outputFile: 'test-results.xml', // Name of the file for test results
      useBrowserName: false // Don't include browser name in the filename
    },
    browsers: ['ChromeHeadless'],
    restartOnFileChange: true,
    singleRun: true, // Ensures Karma stops after running all tests
    browserNoActivityTimeout: 60000, // Increase the timeout for inactivity
    captureTimeout: 60000 // Increase the timeout for browser capture
  });
};
