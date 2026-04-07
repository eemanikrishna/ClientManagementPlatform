Feature: Dashboard Functionality

  @smoke
  Scenario: Search clients by name
    Given the user opens the application
    When the user logs in using Excel data for "TC_01"
    When the user navigates to the dashboard table
    When the user adds a client using Excel data for "TC_01"
    When the user searches for clients by name "Test Client"
    Then the user can view the added client
    And the user logs out

  @smoke
  Scenario: Filter clients by risk category
    Given the user opens the application
    When the user logs in using Excel data for "TC_01"
    When the user navigates to the dashboard table
    When the user adds a client using Excel data for "TC_01"
    When the user filters clients by risk category "Aggressive"
    Then only clients with risk category "Aggressive" should be visible
    And the user logs out