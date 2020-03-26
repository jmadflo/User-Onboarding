describe("Testing form behavior", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/");
    });
    it("Enters values into inputs and submits form data.", () => {
        cy.get('input[name="name"]')
            .type("Darth Vader")
            .should("have.value", "Darth Vader");
        cy.get('input[name="email"]')
            .type("dvader@empire.gov")
            .should("have.value", "dvader@empire.gov");
        cy.get("#role")
            .select("Full Stack Developer")
            .should("have.value", "Full Stack Developer");
        cy.get("#role")
            .select("Full Stack Developer")
            .should("have.value", "Full Stack Developer");
        cy.get('[type="checkbox"]')
            .check();
        cy.get('input[type="submit"]')
            .click();
    });
  });