after yarn install -> npx patch-package

post_install do |installer|
installer.pods_project.targets.each do |target|
target.build_configurations.each do |config|
config.build_settings['EXCLUDED_ARCHS[sdk=iphonesimulator*]'] = "arm64"
end
end
end
end

npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle

cd android
./gradlew assembleRelease
