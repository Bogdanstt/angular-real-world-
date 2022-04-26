describe("Signup and Login", () => {
  let randomString = Math.random().toString(36).substring(2);
  let username = "Auto" + randomString;
  let email = "Auto" + randomString + "@gmail.com";
  let password = "Password1";

  it("Test Valid Signup", () => {
    cy.intercept("POST", "**/*.realworld.io/api/users").as("newUser");
    cy.visit("https://angular.realworld.io/");
    cy.get(".nav").contains("Sign up").click();
    cy.get("[placeholder='Username']").type("Auto" + randomString);
    cy.get("[placeholder='Email']").type("Auto" + randomString + "@gmail.com");
    cy.get("[placeholder='Password']").type(password);
    cy.get("button").contains("Sign up").click();

    cy.wait("@newUser").should(({ request, response }) => {
      expect(response.statusCode).to.eq(200);
      expect(request.body.user.username).to.eq(username);
      expect(request.body.user.email).to.eq(email);
    });
  });
  it.skip("Test Valid Login and mock popular tags", () => {
    cy.intercept("GET", "**/tags", {
      fixture: "popularTags.json",
    });
    cy.visit("https://angular.realworld.io/");
    cy.get(".nav").contains("Sign in").click();
    cy.get("[placeholder='Email']").type("Auto" + randomString + "@gmail.com");
    cy.get("[placeholder='Password']").type(password);
    cy.get("button").contains("Sign in").click();
    cy.get(".tag-list")
      .should("contain", "JavaScript")
      .and("contain", "cypress");
  });
  it("Mock global feed data", () => {
    cy.intercept("GET", "**/api/articles*", {
      fixture: "example.json",
    }).as("articles");
    cy.visit("https://angular.realworld.io/");
    cy.get(".nav").contains("Sign in").click();
    cy.get("[placeholder='Email']").type("Auto" + randomString + "@gmail.com");
    cy.get("[placeholder='Password']").type(password);
    cy.get("button").contains("Sign in").click();
    cy.intercept("GET", "**/api/articles*", {
      fixture: "example.json",
    }).as("articles");
    cy.wait("@articles");
  });
});
// Auto04t3s145nx39
