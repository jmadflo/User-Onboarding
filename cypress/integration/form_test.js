describe("Testing successful form navigation", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/");
    });
    it("Enters values into inputs and submits form data.", () => {

        submitIsDisabled()

        cy.get('input[name="name"]')
            .type("Darth Vader")
            .should("have.value", "Darth Vader")

        submitIsDisabled()

        noErrorsFound()

        cy.get('input[name="email"]')
            .type("dvader@empire.gov")
            .should("have.value", "dvader@empire.gov")

        submitIsDisabled()  
        
        noErrorsFound()

        cy.get("#role")
            .select("Full Stack Developer")
            .should("have.value", "Full Stack Developer")

        submitIsDisabled()

        noErrorsFound()

        cy.get("#role")
            .select("Full Stack Developer")
            .should("have.value", "Full Stack Developer")

        submitIsDisabled()

        noErrorsFound()

        cy.get("#password")
            .type("amazingpassword")
            .should("have.value", "amazingpassword")

        submitIsDisabled()

        noErrorsFound()

        cy.get('[type="checkbox"]')
            .check()

        noErrorsFound()

        cy.get('input[type="submit"]')
            .should("not.be.disabled")
            .click();
    });
  });

  const submitIsDisabled = () => {
      // makes sure submit button is disabled
      return cy.get('input[type="submit"]').should("be.disabled")
  }

  const noErrorsFound = () => {
      // make sure no errors were rendered to user after user finishes entering into input
      return cy.get('.error').should('not.exist')
  }
  