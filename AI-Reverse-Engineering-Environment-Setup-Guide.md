# AI-Assisted Reverse Engineering Setup Guide
## Windows | OpenCode + OpenRouter + REA + Chrome

**Purpose:** Document the setup of a local AI-assisted reverse-engineering environment that can inspect a publicly accessible website and help recreate its observable functionality using Spec-Driven Development (SDD).

**Operating System:** Windows 11  
**Shell:** Windows PowerShell 5.1  
**Target website:** https://designed-to-scale.vercel.app/

---

# 1. Overview of the Setup

We configured three main components:

1. **OpenCode** – AI coding agent that provides the interface for interacting with an AI model and tools.
2. **OpenRouter** – AI model provider that connects OpenCode to available models, including free models.
3. **REA (Reverse Engineer Anything)** – Reverse-engineering toolkit that provides tools for inspecting applications, websites, scripts, binaries, and other artifacts.

We also configured a separate Chrome browser with remote debugging enabled so REA can inspect the website.

## 1.1 Architecture

```text
                    USER
                      |
                      v
                OpenCode CLI
                      |
                      |
                OpenRouter
                      |
                      v
             Selected AI Model
             (Free Model)
                      |
                      v
              AI Agent Actions
                      |
                      v
                 REA Skill
                      |
                      v
                REA Backend
                      |
                      |
             Chrome DevTools
                Protocol
                      |
                      v
             Chrome Inspection
                 Browser
                      |
                      v
              Target Website
```

**Important:** OpenRouter provides access to the AI model. REA provides reverse-engineering capabilities. Chrome provides the browser session that REA can inspect. These are separate components working together.

---

# 2. Prerequisites

Before starting, ensure the following are available:

- Windows 11.
- Internet connection.
- Google Chrome.
- PowerShell.
- VS Code (optional, but useful for working with project files).
- OpenRouter account.
- Access to the target website.

The following tools will be installed:

| Tool | Purpose |
|---|---|
| FNM | Node.js version management |
| Node.js | JavaScript runtime |
| npm | Node package manager |
| OpenCode | AI coding agent |
| REA | Reverse-engineering toolkit |
| Chrome | Website inspection |

---

# 3. Node.js Installation and Configuration

## 3.1 Why Node.js?

OpenCode and REA are distributed through the Node.js ecosystem.

We use Node.js and npm to install and execute these tools.

## 3.2 Install FNM

FNM is a Node.js version manager. It allows us to install and switch between Node.js versions.

Install using:

```powershell
winget install Schniz.fnm
```

## 3.3 Install Node.js

REA 6.10.1 requires one of these minimum versions:

- Node.js 22.23.4 or later in the 22.x line.
- Node.js 24.22.1 or later in the 24.x line.
- Node.js 26.12.1 or later in the 26.x line.

We installed Node.js 26.13.1.

```powershell
fnm install 26.13.1
fnm default 26.13.1
```

## 3.4 Configure FNM to initialize automatically

Without this configuration, a newly opened PowerShell window might use an older system-installed Node.js version.

Check the PowerShell profile:

```powershell
$PROFILE
```

Create it if it does not exist:

```powershell
New-Item -ItemType Directory -Force -Path (Split-Path $PROFILE) | Out-Null

New-Item -ItemType File -Force -Path $PROFILE
```

Add FNM initialization:

```powershell
Add-Content -Path $PROFILE -Value 'fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression'
```

Close and reopen PowerShell.

Verify:

```powershell
node -v
npm -v
```

**Our verified versions:**

```text
Node.js: v26.13.1
npm:     11.20.0
```

---

# 4. OpenCode Installation

## 4.1 What is OpenCode?

OpenCode is the AI coding agent we use as the primary interface.

It allows us to interact with an AI model, work with project files, and invoke integrated tools such as REA.

## 4.2 Install OpenCode

Run:

```powershell
npm install --global opencode-ai
```

Verify the installation:

```powershell
opencode --version
```

**Our installed version:**

```text
1.19.6
```

## 4.3 Launch OpenCode

Navigate to the working directory:

```powershell
cd C:\Users\Ara\SDD
```

Launch:

```powershell
opencode
```

This opens the interactive OpenCode terminal interface.

---

# 5. OpenRouter Configuration

## 5.1 What is OpenRouter?

OpenRouter provides access to multiple AI models through a common API.

Instead of depending on a single model provider, OpenCode can connect to models available through OpenRouter.

We selected OpenRouter because we wanted to use free AI models for this learning and reverse-engineering project.

**Important distinction:**

- OpenCode is the AI coding agent.
- OpenRouter is the model provider.
- The selected model is the AI that generates responses.

## 5.2 Create an OpenRouter API key

1. Visit https://openrouter.ai/
2. Create an account or sign in.
3. Navigate to the API keys section.
4. Create a new API key.
5. Set an appropriate expiration period.
6. Configure the key's spending limit according to your needs.
7. Copy and securely store the generated key.

Our configuration:

| Setting | Value |
|---|---|
| Provider | OpenRouter |
| Key name | user |
| Expiration | 1 year |
| Key spending limit | No limit |

**Security:** Never share API keys in source code, Git repositories, screenshots, or chat conversations.

Each coworker should create and use their own API key.

## 5.3 Connect OpenRouter to OpenCode

Inside OpenCode:

1. Run `/connect`.
2. Select OpenRouter as the provider.
3. Enter the OpenRouter API key when prompted.
4. Select an available model.

Our selected model:

**NVIDIA Nemotron 3.5 Lightning (Free)**

The exact model availability and free usage limits can change.

## 5.4 Important: Free model usage

Selecting a free model does not mean unlimited usage.

Free models may have:

- Request limits.
- Rate limits.
- Provider availability restrictions.
- Context or token limits.

The API key's spending limit and the model's free usage limits are two different things.

Always verify that the selected model is explicitly marked as free before using it.

---

# 6. REA Installation and OpenCode Integration

## 6.1 What is REA?

REA stands for Reverse Engineer Anything.

It provides tools for inspecting different kinds of applications and artifacts.

For our project, we are primarily interested in its web inspection capabilities.

REA can help collect evidence about:

- Website structure.
- JavaScript applications.
- Browser-visible behavior.
- Page accessibility information.
- Console output.
- Observed network and API response structures.
- Browser interactions and scenarios.

REA does not automatically retrieve the original private source code of a website.

Its reconstruction output is an analysis based on available evidence, not a guarantee of the original implementation.

## 6.2 Check REA requirements

Run:

```powershell
npx.cmd rea-agents@latest --help
```

Our installed package version:

```text
rea-agents@6.10.1
```

## 6.3 Configure REA for OpenCode

Run:

```powershell
npx.cmd rea-agents@latest setup --client opencode
```

The setup process asked for permission to apply two changes.

We approved:

- OpenCode integration.
- REA reverse-engineering skill installation.

The setup completed successfully.

The resulting integration provides:

- Agent access through OpenCode.
- Guided reverse-engineering workflows.
- REA skill availability.

## 6.4 Verify REA capabilities

Run:

```powershell
npx.cmd rea-agents@latest capabilities
```

This command displays information about available capabilities and their status.

Our output identified:

```text
Package: rea-agents
Version: 6.10.1

CLI commands: 204
MCP tools: 263
MCP prompts: 6
```

These are the catalog counts reported by our installed version, not a guarantee that every capability is available or configured.

## 6.5 Verify integration inside OpenCode

Launch:

```powershell
opencode
```

Ask OpenCode:

```text
Explain how REA is connected to this OpenCode session
and list the reverse-engineering tools available to you.
```

Our OpenCode session recognised the REA skill and described the available `rea_*` functions.

This confirmed that OpenCode recognised the REA integration.

---

# 7. Configure Chrome for Website Inspection

## 7.1 Why do we need Chrome remote debugging?

REA's `rea_inspect_web_page` tool does not accept an arbitrary public website URL and independently open it.

It requires an existing Chrome-based browser session with a Chrome DevTools Protocol (CDP) endpoint.

CDP allows an external tool to communicate with and inspect an open browser.

The inspection requires two important values:

| Parameter | Meaning |
|---|---|
| `cdp_endpoint` | Address of the browser debugging connection |
| `target_id` | Unique identifier of the browser tab to inspect |

Example values only:

```text
cdp_endpoint:
http://127.0.0.1:9222

target_id:
A unique ID returned by Chrome's target listing
```

These are examples, not values to copy blindly.

## 7.2 Locate Chrome

First, check whether Chrome is running:

```powershell
Get-Process chrome -ErrorAction SilentlyContinue |
Select-Object -First 3 ProcessName, Id
```

Locate the Chrome installation through the Windows registry:

```powershell
Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe" -ErrorAction SilentlyContinue |
Select-Object -ExpandProperty Path
```

Our Chrome installation:

```text
C:\Program Files\Google\Chrome\Application
```

Verify the executable:

```powershell
Test-Path "C:\Program Files\Google\Chrome\Application\chrome.exe"
```

Expected result:

```text
True
```

## 7.3 Create a separate Chrome profile

We do not want to interfere with the user's normal Chrome profile.

Create a dedicated profile directory:

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\REA-Chrome"
```

Our directory:

```text
C:\Users\Ara\REA-Chrome
```

This separate profile keeps inspection-browser data separate from normal browsing data.

## 7.4 Launch Chrome with remote debugging enabled

Run:

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="$env:USERPROFILE\REA-Chrome" "https://designed-to-scale.vercel.app/"
```

This command:

1. Starts a separate Chrome instance.
2. Enables remote debugging on port `9222`.
3. Uses the dedicated `REA-Chrome` profile.
4. Opens the target website.

The target website successfully opened in this inspection browser.

**Important:** Keep this Chrome window open while REA is inspecting it.

Do not expose the debugging port to untrusted networks. It provides powerful browser-control access. Keep it restricted to the local machine.

---

# 8. How REA Inspects a Website

The tool we examined was:

```text
rea_inspect_web_page
```

Its required inputs are:

| Parameter | Required? | Purpose |
|---|---|---|
| `cdp_endpoint` | Yes | Connects to the Chrome debugging endpoint |
| `target_id` | Yes | Identifies the exact browser tab |
| `allowed_origins` | No | Restricts capture to specified website origins |
| `discovery_timeout_ms` | No | Controls discovery timeout |
| `command_timeout_ms` | No | Controls CDP command timeout |
| `observation_ms` | No | Controls the observation window |
| `include_accessibility_text` | No | Includes accessibility information |
| `include_console_text` | No | Includes console information |
| `include_json_body_shapes` | No | Includes observed JSON response structures |
| `include_websocket_shapes` | No | Includes WebSocket message structures |
| `include_storage_keys` | No | Includes browser storage key names |
| `include_storage_fingerprints` | No | Includes storage fingerprints |
| `include_script_sources` | No | Includes available script sources |

The tool needs an existing browser connection and a target ID.

It does not independently navigate to an arbitrary URL.

---

# 9. Current Setup Status

The following activities have been completed:

| Activity | Status |
|---|---|
| Install FNM | Completed |
| Install Node.js | Completed |
| Configure automatic FNM initialization | Completed |
| Install OpenCode | Completed |
| Create OpenRouter API key | Completed |
| Connect OpenRouter to OpenCode | Completed |
| Select a free AI model | Completed |
| Install and configure REA | Completed |
| Verify REA capability catalog | Completed |
| Verify REA recognition inside OpenCode | Completed |
| Locate Chrome executable | Completed |
| Create separate Chrome profile | Completed |
| Launch Chrome with remote debugging | Completed |
| Open target website | Completed |
| Verify REA can connect to the Chrome CDP endpoint | Pending |
| Retrieve the actual browser target ID | Pending |
| Execute `rea_inspect_web_page` | Pending |
| Perform website reverse engineering | Pending |

**Note:** The environment is configured for the next inspection stage, but we have not yet completed an actual REA browser inspection.

---

# 10. Next Steps: Website Reverse Engineering

Once the browser connection is verified, follow this sequence.

```text
Target Website
      |
      v
Discover Browser Targets
      |
      v
Get Actual Target ID
      |
      v
Connect REA to Chrome using CDP
      |
      v
Inspect Website
      |
      v
Collect Evidence
      |
      +---------------------+
      |          |          |
      v          v          v
   UI/Layout  Navigation  Interactions
      |          |          |
      +----------+----------+
                 |
                 v
          Analyze Findings
                 |
                 v
        Create SDD Artifacts
                 |
                 v
        Implement Recreation
                 |
                 v
          Validate Results
```

Recommended reverse-engineering sequence:

1. Identify all accessible pages and routes.
2. Inspect the page layouts and components.
3. Identify navigation and user interactions.
4. Observe API requests and response structures where available.
5. Inspect available JavaScript assets.
6. Document the evidence and unknowns.
7. Convert findings into requirements and specifications.
8. Create the implementation plan.
9. Implement the application.
10. Compare the recreation against the observed website.

---

# 11. Reusable Setup Checklist for Another Coworker

Use this checklist when reproducing the environment on another Windows machine.

- [ ] Install FNM.
- [ ] Install a REA-compatible Node.js version.
- [ ] Configure FNM in the PowerShell profile.
- [ ] Restart PowerShell and verify Node.js and npm.
- [ ] Install OpenCode globally.
- [ ] Create an OpenRouter account.
- [ ] Generate an individual OpenRouter API key.
- [ ] Connect OpenRouter through `/connect` in OpenCode.
- [ ] Select an explicitly free model.
- [ ] Install REA using the setup command.
- [ ] Verify REA capabilities.
- [ ] Verify that OpenCode recognises the REA skill.
- [ ] Locate the Chrome executable.
- [ ] Create a separate Chrome inspection profile.
- [ ] Launch Chrome with remote debugging enabled.
- [ ] Open the target website.
- [ ] Discover the Chrome target ID.
- [ ] Verify the REA browser connection.
- [ ] Begin website inspection.

---

# 12. Important Notes and Troubleshooting

### Node.js version mismatch

If REA reports that the Node.js version is unsupported, check:

```powershell
node -v
where.exe node
```

Ensure that the FNM-managed version is active.

### OpenCode does not recognise REA

Check that the REA setup was completed:

```powershell
npx.cmd rea-agents@latest setup --client opencode
```

Restart OpenCode after configuration changes.

### Chrome cannot be found using `where.exe chrome`

Chrome may not be registered in the Windows PATH.

Check its registry location or use the common installation path:

```text
C:\Program Files\Google\Chrome\Application\chrome.exe
```

### Chrome inspection browser asks for sign-in

The separate Chrome profile is new and does not contain the normal Chrome profile's Google sign-in.

Google sign-in is not automatically required to inspect a publicly accessible website. If the target website itself requires authentication, that is a separate requirement.

### REA cannot access the browser

Check that:

- The inspection Chrome window is still running.
- Remote debugging was enabled on port `9222`.
- The correct CDP endpoint is being used.
- The target ID belongs to the correct browser tab.

---

# 13. Final Understanding

The purpose of this setup is to create a reusable environment where an AI coding agent can use reverse-engineering tools to understand an existing application's observable behavior.

The responsibilities are separate:

- **OpenCode:** AI agent and working interface.
- **OpenRouter:** Provides access to the selected AI model.
- **REA:** Provides reverse-engineering and inspection tools.
- **Chrome + CDP:** Provides access to the live browser session.
- **SDD:** Provides the structured process for converting observations into requirements, specifications, plans, and implementation tasks.

The objective is not to recover the original private source code. It is to collect sufficient evidence about the website's observable behavior and use that evidence to build a structured, well-understood recreation.

**Project target:** https://designed-to-scale.vercel.app/