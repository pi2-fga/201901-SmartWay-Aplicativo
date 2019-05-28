import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

export const loadingAlert = (title, msg) => (
    <AwesomeAlert
        show={true}
        showProgress={true}
        title={title}
        message={msg}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
    />
);