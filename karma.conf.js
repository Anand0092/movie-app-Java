// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma'),
      require('karma-junit-reporter')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'junit'],
    junitReporter: {
      outputDir: 'reports/karma/cadettests/',
      outputFile: 'karma-test-result.xml',
      suite: '',
      useBrowserName: false,
    },
    port: 9876,
    colors: true,
    // logLevel: config.LOG_DEBUG,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
        //   '--headless',
        //   '--disable-gpu',
        //   '--remote-debugging-port=9222',
        //   '--no-sandbox'
        // Run as headless
          '--headless',
          // GPU is disabled to run as headless
          '--disable-gpu',
          // Without a remote debugging port, Google Chrome exits immediately.
          '--remote-debugging-port=9222',
          // '--remote-debugging-address=0.0.0.0'
          '--no-sandbox',
          // Disable built-in Google Translate service
          '--disable-translate',
          // Disable all chrome extensions entirely
          '--disable-extensions',
          // Disable various background network services, including extension updating,
          //   safe browsing service, upgrade detector, translate, UMA
          '--disable-background-networking',
          // Disable fetching safebrowsing lists, likely redundant due to disable-background-networking
          '--safebrowsing-disable-auto-update',
          // Disable syncing to a Google account
          '--disable-sync',
          // Disable reporting to UMA, but allows for collection
          '--metrics-recording-only',
          // Disable installation of default apps on first run
          '--disable-default-apps',
          // Mute any audio
          '--mute-audio',
          // Skip first run wizards
          '--no-first-run',
          // Disable web security
          '--disable-web-security'
        ],
      }
    },
    singleRun: true,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 60000,
    browserDisconnectTimeout: 10000,
    transports: ['polling']
  });
};