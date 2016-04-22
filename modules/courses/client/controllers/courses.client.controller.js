'use strict';

// Courses controller
angular.module('courses').controller('CoursesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Courses',
  function ($scope, $stateParams, $location, Authentication, Courses) {
    $scope.authentication = Authentication;

    // Create new Course
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'courseForm');

        return false;
      }

      // Create new Course object
      var course = new Courses({
        title: this.title,
        shortDescription: this.shortDescription,
        fullDescription: this.fullDescription,
        keyDetails: this.keyDetails,
        cost: this.cost,
        signupNotes: this.signupNotes,
        scheduleNotes: this.scheduleNotes,
        locationName: this.locationName,
        address1: this.address1,
        address2: this.address2,
        city: this.city,
        state: this.state,
        zipCode: this.zipCode,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        contactEmail: this.contactEmail,
        dateTimeInterval: this.dateTimeInterval,
        url: this.url,
        datesScheduled: this.datesScheduled,
        sundayHours: this.sundayHours,
        mondayHours: this.mondayHours,
        tuesdayHours: this.tuesdayHours,
        wednesdayHours: this.wednesdayHours,
        thursdayHours: this.thursdayHours,
        fridayHours: this.fridayHours,
        saturdayHours: this.saturdayHours
      });

      // Redirect after save
      course.$save(function (response) {
        $location.path('courses/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.shortDescription = '';
        $scope.fullDescription = '';
        $scope.keyDetails = '';
        $scope.cost = '';
        $scope.signupNotes = '';
        $scope.scheduleNotes = '';
        $scope.locationName = '';
        $scope.address1 = '';
        $scope.address2 = '';
        $scope.city = '';
        $scope.state = '';
        $scope.zipCode = '';
        $scope.contactName = '';
        $scope.contactPhone = '';
        $scope.contactEmail = '';
        $scope.dateTimeInterval = '';
        $scope.url = '';
        $scope.datesScheduled = '';
        $scope.sundayHours = '';
        $scope.mondayHours = '';
        $scope.tuesdayHours = '';
        $scope.wednesdayHours = '';
        $scope.thursdayHours = '';
        $scope.fridayHours = '';
        $scope.saturdayHours = '';






      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Course
    $scope.remove = function (course) {
      if (course) {
        course.$remove();

        for (var i in $scope.courses) {
          if ($scope.courses[i] === course) {
            $scope.courses.splice(i, 1);
          }
        }
      } else {
        $scope.course.$remove(function () {
          $location.path('courses');
        });
      }
    };

    // Update existing Course
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'courseForm');

        return false;
      }

      var course = $scope.course;

      course.$update(function () {
        $location.path('courses/' + course._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Courses
    $scope.find = function () {
      $scope.courses = Courses.query();
    };

    // Find existing Course
    $scope.findOne = function () {
      $scope.course = Courses.get({
        courseId: $stateParams.courseId
      });
    };
  }
]);
