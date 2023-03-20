# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Assuming data stored in relational database.

1) STORY-001 - Create Table to support custom ids for agents
2) STORY-002 - Develop API to assign custom ids for agents
3) STORY-003 - Develop UI to assigning custom ids for agents.
4) STORY-004 - Modify generateReport function to get single agent hours of work w.r.t facility.

### STORY-001 - Create Table to support custom ids for agents
**Description:** 
- Create `FacilityCustomAgentIds` table with columns [id, facilityId(foreign key), agentId(foreign key), customAgentId].
- `facilityId` + `customAgentId` is composite key to uniquely identify agent w.r.t facility.


**Acceptance criteria:**
- Given Booking database
- When I run list table command
- Then `FacilityCustomAgentIds` table should present
- And [id, facilityId(foreign key), agentId(foreign key), customAgentId] columns should present
- And `facilityId` + `customAgentId` should be composite key.

**Estimation:** 2hrs


### STORY-002 - Develop API to assign custom ids for agents
**Description:**
* Create webservice to handle custom id assignment request. 
* POST API call with inputs { `agentId`:"", `customAgentId`:"" }
* Facility id should be taken from session or jwt token.
* Verify customAgentId is unique w.r.t facility.
* Verify `agentId` is valid.
* if entry is duplicate respond with 409 status code with error message.
* Save the entry in `FacilityCustomAgentIds` table and respond with 200 status code and row object for UI with id.
* add postman collection.
* add unit tests.

**Acceptance criteria:**
- Given POST API call
- When post unique { `agentID`:"", `customAgentId`:"" } payload through REST client
- Then API should respond with 200 status code 
- And response should contain id, agentId, customAgentId
- When post duplicate { `agentID`:"", `customAgentId`:"" } payload through REST client
- Then API should respond with 409 status code

**Estimation:** 12 Hours

### STORY-003 - Develop UI to assigning custom ids for agents.
Assuming facility has UI table with selected agents. (DataTable or AgGrid)

**Description:** 
* Provide input field w.r.t each agent to add `customAgentId`
* Provide save button w.r.t each row
* add Input validation for `customAgentId` format ( Numbers/ alphanumeric )
* add onKeyUp event listener for input validation
* when input invalid display error message.
* provide helper text for `customAgentId` format.
* enable save button only when `customAgentId` validation success
* Develop fetch post call with payload { `agentID`:"", `customAgentId`:"" }
* on 409 status code disable `save` button and display error message.
* onClick call api and based on response update table entry.
* Add Unit tests

**Acceptance criteria:**
- Given Facility agents data table
- When page load completes
- Then `customAgentId` column should present with empty values and save button
- When I type invalid `customAgentId`
- Then `save` button should disabled and error message should be displayed
- When I type valid `customAgentId`
- Then `save` button should enabled
- On Click of `save` button POST api call should trigger.


**Estimation:** 12 Hours

### STORY-004 - Modify generateReport function to get single agent hours of work w.r.t facility.
Assuming generate report API available, now we need to provide modify API to fetch single agent report by providing custom agent id.

**Description**

API
- Modify `generateReport` function to get sing agent hours of work.
- read request input `customAgentId` and query to fetch respective `agentId` w.r.t Facility
- format the query results and respond with 200 status code.

**Estimation:** 3 Hours


