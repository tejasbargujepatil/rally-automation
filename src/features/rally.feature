Feature: Rally Automation
  Scenario: Export User Stories
    Given I have valid Rally credentials
    When I request user stories from Rally
    Then Stories should be saved to the local directory

  Scenario: Import Test Cases
    Given I have a valid CSV file
    When I import test cases to Rally
    Then Test cases should be created in Rally

    