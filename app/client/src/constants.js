const angular = require('angular');

angular.module('reg')
    .constant('EVENT_INFO', {
        NAME: 'HackOHI/O 2021',
    })
    .constant('DASHBOARD', {
        UNVERIFIED: 'You should have received an email asking you verify your email. Click the link in the email and you can start your application! If you can\'t find your verification email, please check your spam folder.',
        INCOMPLETE_TITLE: 'You still need to complete your registration!',
        INCOMPLETE: 'Please complete your sign-up form before [APP_DEADLINE].',
        SUBMITTED_TITLE: 'Your sign-up form has been submitted!',
        SUBMITTED: 'Feel free to edit it at any time. However, once registration is closed, you will not be able to edit it any further.\nPlease make sure your information is accurate before registration is closed!',
        CLOSED_AND_INCOMPLETE_TITLE: 'Unfortunately, registration has closed.',
        CLOSED_AND_INCOMPLETE: 'Sorry, you did not complete your application and registration is closed',
        ADMITTED_AND_CAN_CONFIRM_TITLE: 'You must confirm by October 20th at 7:00PM.',
        ADMITTED_AND_CANNOT_CONFIRM_TITLE: 'Your confirmation deadline of [CONFIRM_DEADLINE] has passed.',
        CONFIRMED_NOT_PAST_TITLE: 'You can edit your confirmation information until October 20th at 7:00PM',
        DECLINED: 'We\'re sorry to hear that you won\'t be able to make it to HackOHI/O 2021! :(\nMaybe next year! We hope you see you again soon.',
    })
    .constant('TEAM', {
        NO_TEAM_REG_CLOSED: 'Unfortunately, it\'s too late to enter with a team.\nHowever, you can still form teams on your own before or during the event!',
    });
