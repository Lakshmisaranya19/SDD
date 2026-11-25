# Spec-Driven Development (SDD) — Beginner Learning Notes

**Author:** ChatGPT  
**Reviewer:** Dhulipala Lakshmi Saranya
**Date:** 23rd November 2026

---

## 1. Introduction to Spec-Driven Development

Let's first understand the term:

- **Spec:** Short for Specification — a description of what needs to be built.
- **Driven:** Guided or directed by something.
- **Development:** Building software or an application.

**Spec-Driven Development (SDD)** is an approach to software development where we define what we want to build through a specification and use it to guide development and validation.

The central idea is:

> First establish what the software is expected to do. Then use that understanding to guide implementation and testing.

### Example: Building a food delivery application

Imagine your manager asks you to build a food delivery application.

Would you immediately start writing code?

Not necessarily. You would first need clarity on questions such as:

- Who will use the application?
- Can users browse restaurants?
- Can users add food to a cart?
- Can users place orders?
- Can users track deliveries?
- How will payments work?

These questions help us understand what needs to be built.

A basic specification might contain:

- Users can browse restaurants.
- Users can view food items and prices.
- Users can add items to a cart.
- Users can place orders.
- Users can track their orders.

The specification provides a common understanding for everyone involved in building the application.

### Basic SDD workflow

```text
Business Requirement
        |
        v
Specification
(What should the software do?)
        |
        v
Development
(Build the software)
        |
        v
Testing and Validation
(Check whether it meets the specification)
```

The specification acts as a guide throughout development. It can also evolve when requirements become clearer or change.

**Key takeaway:** Instead of immediately jumping into coding, first establish what needs to be built.

---

## 2. Why Do We Need a Specification?

Imagine two developers are asked to build the same login page.

Both might implement the same basic functionality:

- Accept an email address or username.
- Accept a password.
- Validate the credentials.
- Allow users to log in.
- Display an error when credentials are incorrect.

However, their implementations might look different.

For example:

- One developer might use a blue button, while another uses green.
- One might label the button "Sign In", while another uses "Login".
- Error messages might have different wording.
- The page layout and button alignment might differ.

This introduces two important aspects of an application.

### 2.1 Functional Behaviour — What the Application Does

Examples:

- Accept login details.
- Validate credentials.
- Reject incorrect credentials.
- Allow successful users to continue.

### 2.2 Presentation and User Experience — How the Application Looks and Feels

Examples:

- Button colour and text.
- Page layout and alignment.
- Error-message wording.
- Placement of links such as "Create an account".

### How Does a Specification Help?

Instead of simply saying:

"Create a login page."

We can provide more specific instructions:

- The page must contain an email field and a password field.
- The login button must display the text "Sign In".
- Incorrect credentials must produce the message "Invalid email or password".
- The login button must appear below the input fields.

Now both developers have clearer expectations.

**Important:** A specification does not necessarily describe every implementation detail. It should describe the expected behaviour and the decisions that need to remain consistent.

---

## 3. Functional Requirements

A functional requirement describes **what the system should do**.

It includes the application's expected behaviour in normal situations and under different conditions.

Consider this requirement:

"The user should be able to log in using an email address and password."

This is a starting point, but it leaves several questions unanswered.

For example:

- What happens if the email field is empty?
- What happens if the password field is empty?
- What happens if the password is incorrect?
- What happens after successful login?
- What happens if someone tries to register a second account using an email address that is already registered?

These questions help us identify missing functional requirements.

| Scenario | What should be clarified? |
|---|---|
| Email is empty | Should an error message be displayed? |
| Password is empty | Should login be prevented? |
| Incorrect password | What error should appear? |
| Successful login | Where should the user be redirected? |
| Email already registered | Should duplicate registration be prevented? |

### Example: Duplicate Email Registration

Suppose someone registers using:

```text
Email: user@gmail.com
Password: Password123
```

Later, someone tries registering again using:

```text
Email: user@gmail.com
Password: DifferentPassword456
```

Should the application create another account?

Usually, no. The application should enforce email uniqueness.

Notice that this example belongs to the registration feature rather than strictly to login. However, reviewing one feature can reveal missing requirements in related features.

**Key takeaway:** Functional requirements are not limited to the happy path. They also describe how the system should behave when inputs are missing, invalid, duplicated or unexpected.

---

## 4. Non-Functional Requirements

A non-functional requirement describes the quality attributes or constraints of a system.

In simple terms, it explains **how well the system should operate or what conditions it must satisfy**.

Examples include:

- Performance
- Security
- Scalability
- Availability
- Reliability

Let's compare functional and non-functional requirements.

| Requirement | Category | Reason |
|---|---|---|
| Display an error when the password is incorrect | Functional | Defines application behaviour |
| Complete a login request within an agreed response time | Non-functional | Defines performance |
| Support 10,000 concurrent users | Non-functional | Defines scalability |
| Store passwords using an approved secure password-hashing approach | Non-functional | Defines a security constraint |

### Easy Way to Remember

- **Functional requirements:** What should the system do?
- **Non-functional requirements:** How well should it do it, or what qualities and constraints should it satisfy?

---

## 5. Characteristics of a Good Specification

A good specification should reduce ambiguity and provide enough information for developers and testers to understand the expected result.

Three important characteristics are:

### 5.1 Clear

Everyone involved should understand the requirement in the same way.

**Vague requirement:**

"The application should be fast."

Different people may interpret "fast" differently.

- Developer A thinks 5 seconds is fast.
- Developer B thinks 2 seconds is fast.
- A tester does not know what response time to validate.

### 5.2 Specific

The requirement should provide enough detail to avoid unnecessary assumptions.

For example:

"The user must enter a valid email address to register."

This still leaves questions:

- What format is accepted?
- What happens if the email field is empty?
- What happens if the email is already registered?
- What happens if the email contains leading or trailing spaces?

### 5.3 Let's Compare with Examples

Although *clear* and *specific* sound similar, they focus on two different things.

- **Clear:** Is the requirement easy to understand?
- **Specific:** Does the requirement provide enough details to avoid assumptions?

#### Example 1: Login Error Message

**Clear but not specific:**

> Display an error message when the user enters an incorrect password.

We understand what should happen, but some details are missing:
- What should the error message say?
- Where should it appear?

**Clear and specific:**

> When the user enters an incorrect password, display the message "Invalid email or password" below the login form.

Now the expected behaviour and the message are clearly defined.

#### Example 2: Everyday Situation

Imagine asking someone to bring you a drink.

| Instruction | What is missing? |
|---|---|
| Bring me a drink. | The type of drink is unknown. |
| Bring me a glass of water. | The quantity and temperature are not specified. |
| Bring me a 250 ml glass of room-temperature drinking water. | The expectation is much more specific. |

Each instruction becomes more specific by adding details.

#### Example 3: Account Locking

**Requirement:**

> The application should lock the user's account after 5 consecutive failed login attempts.

This requirement is both clear and specific about the number of failed attempts.

However, additional details may still be needed:
- How long should the account remain locked?
- Can the user unlock it through password recovery?
- Should the user receive a notification?

This shows that a requirement can be clear and specific about one aspect while still needing more details about other aspects.

#### Quick Comparison

| Clear | Specific |
|---|---|
| Easy to understand | Provides sufficient details |
| Avoids confusing language | Avoids missing details and assumptions |
| Focuses on understandable meaning | Focuses on precision |

**Important:** Clear and specific are not competing qualities. A good requirement should have both. It should be easy to understand and detailed enough to define the expected behaviour.



### 5.4 Measurable and Testable

We should be able to verify whether the requirement has been satisfied.

**Vague requirement:**

"The login page should be fast."

**More testable requirement:**

"The login request should receive a response within 2 seconds under the defined normal operating conditions."

Now developers have a clearer performance expectation, and testers have something measurable to validate.

The two-second value is illustrative. In a real project, the expected response time should be agreed upon based on business and technical requirements.

### Example: Password Security

Consider this requirement:

"The application should securely store user passwords."

Is this sufficiently specific?

Not necessarily. Several questions remain:

- What password-storage approach should be used?
- Which approved password-hashing algorithm should be used?
- How should salts be handled?
- Who should have access to the stored credentials?

**Technical clarification:** Passwords should generally be stored using secure, purpose-built password hashing rather than reversible encryption. Algorithms such as Argon2id and bcrypt are commonly used.

**Key takeaway:** A good specification should be clear, specific and testable.

---

## 6. Who Should Contribute to a Good Specification?

A specification should not depend on one person's assumptions.

Different roles contribute different perspectives.

| Role | Contribution |
|---|---|
| Product Owner / Business Analyst | Explains business needs, user expectations and business rules |
| Developer | Identifies technical feasibility and implementation considerations |
| SDET / Tester | Identifies missing scenarios, edge cases and testability |
| Security Engineer | Identifies security requirements and risks |
| Other Stakeholders | Clarify business expectations and constraints |

### Example: Email Registration

Consider the requirement:

"The user must enter a valid email address to register."

Different team members may raise different questions.

**Tester / SDET:**

- What if the email is empty?
- What if the email has no `@` symbol?
- What if the email is already registered?
- What if the value contains leading or trailing spaces?

**Developer:**

- What email validation rules should be implemented?
- How should the application check whether an email already exists?

**Product Owner / Business Analyst:**

- Should users be allowed to register using company email addresses only?
- Is email verification mandatory?

Each role contributes information that helps make the specification more complete.

### Important SDET Perspective

Testing does not begin only after code is written.

SDETs can contribute during requirement analysis by:

- Reviewing requirements.
- Identifying missing scenarios.
- Finding edge cases.
- Asking questions about expected behaviour.
- Ensuring requirements are testable.

This helps identify problems before development begins.

---

## 7. Connecting SDD with AI-Assisted Development

The next step is understanding how specifications can guide AI-assisted software development.

Consider this instruction:

"Build me a food delivery application."

An AI coding tool may make assumptions about:

- Features.
- User workflows.
- Application design.
- Business rules.
- Technical choices.

This happens because the instruction does not provide enough information about the expected application.

A well-defined specification provides clearer context and constraints for an AI coding agent.

We will explore this connection in the next learning session.

---

## 8. Quick Revision

| Concept | Simple Meaning | Example |
|---|---|---|
| Specification | Description of what needs to be built | Define how a login page should work |
| Functional Requirement | What the system should do | Display an error for an incorrect password |
| Non-Functional Requirement | Quality or constraint of the system | Meet an agreed login response-time target |
| Clear Requirement | Can be understood consistently | Specify the exact error message |
| Specific Requirement | Provides enough detail | Define what happens when the email is empty |
| Testable Requirement | Can be verified | Measure whether the response meets the agreed target |
| Collaboration | Relevant roles clarify requirements together | Developer, tester and Product Owner review requirements |

### Overall Picture

```text
Business Need
      |
      v
Understand the Expected Application
      |
      v
Identify Functional Requirements
      |
      v
Identify Non-Functional Requirements
      |
      v
Clarify Edge Cases and Constraints
      |
      v
Review Requirements Collaboratively
      |
      v
Create a Clear, Specific and Testable Specification
      |
      v
Use the Specification to Guide Development
and Validation
```

---

## 9. Important Learning Takeaways

1. Do not rush directly into coding when requirements are unclear.
2. A broad requirement can lead different developers to make different assumptions.
3. Functional requirements cover expected behaviour, including edge cases.
4. Non-functional requirements cover qualities and constraints such as performance, security and scalability.
5. Avoid vague terms such as "fast" and "secure" without agreed, verifiable expectations.
6. Developers, testers, Product Owners and other stakeholders should collaborate to clarify requirements.
7. SDETs can contribute before development by identifying missing scenarios and improving testability.
8. A specification is a guide that can evolve as the team's understanding changes.

---

**Current Learning Status:** Introduction to SDD, specifications, functional requirements, non-functional requirements and characteristics of a good specification.

**Next Topic:** How AI-assisted Spec-Driven Development uses specifications to guide AI coding agents.