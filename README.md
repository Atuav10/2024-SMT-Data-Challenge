# Pitcher Dynamics xPLained - Creating a Model that Determines When to Pull a Starting Pitcher

This repository houses our project submitted to the 2024 SMT Data Challenge. It consists of our final paper, the code for the project (in an html RMarkdown file), and our final paper.

## [Code](https://github.com/Atuav10/2024SMTDataChallenge/blob/main/code/code.html)

The code for our project is housed in one singular RMarkdown file. We were unable to publish the data. Simply download the file and you can understand how we went about our project.

## [Paper](https://github.com/Atuav10/2024SMTDataChallenge/blob/main/paper.pdf)

We have attached the paper we submitted to the competition. It contains a rigorous analysis of our project as well as the potential applications.

## [The Snell Tool](https://github.com/Atuav10/2024SMTDataChallenge/tree/main/user_interface)

The app UI (shown below) consists of several key components, each serving a specific function to collect data, display results, and guide the user through the decision-making process. The UI is mobile-friendly, ensuring proper display on any device.

<img width="677" alt="Screenshot 2024-08-08 at 10 00 24 PM" src="https://github.com/user-attachments/assets/f8e054f8-8fe2-4345-bb6c-a6aaedbb22ed">

### Primary Components

1. **Data Input Form**:
   - **Pitch Count, Inning Count, and Outs in Inning**: These input fields allow users to enter numerical data regarding the pitcher's current game statistics. The UI utilizes standard HTML `<input>` elements with appropriate validation to ensure accurate data entry.
   - **Base-runner Situation**: Dropdown menus represent the bases (first, second, and third), allowing users to specify the presence of runners. This feature dynamically updates the game state and contributes to the difficulty calculation.
   - **Hitter Number**: An input field lets the user enter the position of the current batter in the lineup, influencing the expected performance metrics.
   - **Qualitative Variables (Confidence and Fragility)**: Two dropdown menus provide options from 1 to 5, representing the pitcher's subjective attributes. Descriptive text under each dropdown helps users understand the impact of these selections on the decision-making process.

2. **Real-time Feedback and Recommendations**:
   - **Dynamic Display of Difficulty**: Once the user inputs the relevant data, the app calculates the difficulty of the current game situation based on the outs and base-runner configuration. This value is immediately displayed, providing real-time feedback.
   - **Expected Metrics and Decision Output**: The app calculates the expected pitches left in the game (xPLG) and in the inning (xPLI). Based on these metrics, a recommendation is generated and displayed, advising whether to pull the pitcher or keep them in. The recommendation appears in a dedicated results section, highlighted for emphasis.

3. **Interactive Design Elements**:
   - **Responsive Layout**: The UI is designed to be responsive, adapting to various screen sizes and devices. Users can access the app on desktops, tablets, and smartphones without compromising functionality.
   - **User Guidance and Error Handling**: The UI includes tooltips, placeholder text, and validation messages to guide users through the data entry process. If a user inputs an invalid value or leaves a required field empty, the app provides instant feedback to correct the error.

### Technical Mechanisms

1. **State Management with React Hooks**:
   - The app leverages React's `useState` and `useEffect` hooks to manage and update the state. Each input field updates the corresponding state variable, triggering recalculations and UI updates. This ensures all changes are reflected in real-time, providing an interactive experience.

2. **Form Handling and Data Submission**:
   - Upon submission, the form data is collected and passed to the parent component (`App.js`). This data includes numerical inputs and qualitative assessments, which are used to compute the xPLG and xPLI metrics. The app uses JavaScript’s `onSubmit` event handler to prevent the default form submission behavior and instead processes the data asynchronously.

3. **Real-time Calculation and Rendering**:
   - The calculation of xPLG and xPLI is handled within the `App.js` component. As the user interacts with the form, the app recalculates these metrics using the most up-to-date data. React’s virtual DOM efficiently updates only the necessary parts of the UI, ensuring smooth performance even with frequent updates.

4. **Visualization and Feedback Loop**:
   - The UI provides a visual representation of the decision-making process. The calculated difficulty, expected metrics, and final recommendation are presented clearly and concisely. This feedback loop informs the user of the current situation and educates them on the factors influencing the recommendation.
