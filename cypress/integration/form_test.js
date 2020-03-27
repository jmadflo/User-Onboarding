describe("Testing successful form navigation", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/");
    });
    it("Enters values into inputs and submits form data.", () => {

        submitIsDisabled(true)

        cy.get('input[name="name"]')
            .type("Darth Vader")
            .should("have.value", "Darth Vader")
            .should("have.length", !0)

        submitIsDisabled(true)
        noErrorsFound()

        cy.get('input[name="email"]')
            .type("dvader@empire.gov")
            .should("have.value", "dvader@empire.gov")
            .should("have.length", !0)

        submitIsDisabled(true)    
        noErrorsFound()

        cy.get("#role")
            .select("Full Stack Developer")
            .should("have.value", "Full Stack Developer")

        submitIsDisabled(true)
        noErrorsFound()

        cy.get("#password")
            .type("amazingpassword")
            .should("have.value", "amazingpassword")
            .should("have.length", !0)

        submitIsDisabled(true)
        noErrorsFound()

        cy.get('[type="checkbox"]')
            .check()
            .should("be.checked")

        submitIsDisabled(false)
        noErrorsFound()

        // go back and check for if app gives errors and disables submit for invalid and taken emails
        cy.get('input[name="email"]')
            .clear()
            .type("dvader")
            .should("have.value", "dvader")

        submitIsDisabled(true)
        cy.get('#email-error').contains("This needs to be a valid email address.") 

        cy.get('input[name="email"]')
            .clear()
            .type("waffle@syrup.com")
            .should("have.value", "waffle@syrup.com")

        submitIsDisabled(true)
        cy.get('#email-error').contains("That email is already taken")

        // put the valid email back
        cy.get('input[name="email"]')
            .clear()
            .type("dvader@empire.gov")
            .should("have.value", "dvader@empire.gov")
            .should("have.length", !0)

        submitIsDisabled(false)
        noErrorsFound()

        cy.get('input[type="submit"]')
            .should("not.be.disabled")
            .click();
    });
  });

const submitIsDisabled = (status) => {
    // will be used to make sure submit button is disabled when user has not yet filled out required info and enabled when form is completed
    if (status){
        return cy.get('input[type="submit"]').should("be.disabled")
    } else if (!status){
        return cy.get('input[type="submit"]').should("not.be.disabled")
    }
            
}

const noErrorsFound = () => {
    // make sure no errors were rendered to user after user finishes entering into input
    return cy.get('.error').should('not.exist')
}

  

  


  