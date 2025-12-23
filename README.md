# 🛡️ InfoSec Learning Hub

<p align="center">
  <b><i>An Interactive Visualization of Core Cybersecurity Concepts</i></b>
</p>

---

## <u>📖 About The Project</u>

**InfoSec Learning Hub** is a comprehensive, single-page web application designed to bridge the gap between abstract cybersecurity theory and practical application. 

In traditional education, concepts like **TCP/IP Handshakes**, **Encryption Algorithms**, or **Malware Propagation** are often taught through static diagrams. This project replaces those static images with **interactive, gamified simulations**.

The platform offers a **dual-layer learning experience**:
1.  **The Visual Layer:** Users interact with graphical elements (e.g., spinning cipher wheels, exploding file systems) to see the "cause and effect" of security events.
2.  **The Logic Layer:** Real-time **Python code snippets** are displayed alongside the visuals, explaining the backend logic (loops, socket connections, bitwise operations) driving the animation.

---

## <u>✨ Key Modules & Features</u>

### 1. 🔐 Cryptography (Caesar Cipher)
This module visualizes **Substitution Ciphers**, specifically the Caesar Cipher, which is the foundation of understanding encryption keys.
* **<u>Visuals:</u>** Features an interactive **"Shift Wheel"** where users can rotate the alphabet ring to see how Plaintext maps to Ciphertext.
* **<u>Logic:</u>** Demonstrates the mathematical formula `(x + n) % 26`, showing how ASCII values are shifted and wrapped around the alphabet.
* **<u>Key Takeaway:</u>** Understanding how keys transform data and the vulnerability of simple substitution methods.

### 2. 🌐 Network Architecture (TCP/IP & HTTP)
A complete simulation of the **Client-Server-Database** lifecycle, demystifying how the internet works "under the hood."
* **<u>Visuals:</u>** Animated packets travel across a digital wire, changing state as they move from the Client to the Web Server, trigger an internal SQL Query to the Database, and return a JSON response.
* **<u>Logic:</u>** Displays **Python Socket Programming** concepts, explaining how `socket.send()` and `socket.recv()` handle reliable data delivery.
* **<u>Key Takeaway:</u>** Visualizing the **Multi-Tier Architecture** and the reliability mechanisms of the TCP protocol.

### 3. 🦠 Malware Simulation (Viruses & Logic Bombs)
A gamified demonstration of how malware infects a system and the specific mechanics of a **Logic Bomb**.
* **<u>Visuals:</u>** A grid-based file system where a "Bomb" is planted. A countdown timer triggers a recursive infection algorithm that corrupts files (turns them red) spreading rapidly across the grid. Ends with a "System Failure" glitch effect.
* **<u>Logic:</u>** Explains the code behind **dormant triggers** (time-based execution) and **recursive propagation loops** used in real-world malware.
* **<u>Key Takeaway:</u>** Understanding the difference between passive files and self-replicating executable malicious code.

### 4. 👁️ Steganography (LSB Encoding)
Demystifies the art of **"Security by Obscurity"** by showing how data is hidden inside media files without encryption.
* **<u>Visuals:</u>** An automated "decoder" animation that peels back the layers of a cover image (a sunset) to reveal the hidden "noise" layer, and finally, the secret payload.
* **<u>Logic:</u>** detailed explanation of **Least Significant Bit (LSB)** manipulation, showing how binary data can be altered imperceptibly to the human eye.
* **<u>Key Takeaway:</u>** Understanding that hidden data is not the same as encrypted data.

---

## <u>🛠️ Technical Stack</u>

This project utilizes a modern component-based architecture to ensure smooth performance and advanced animations.

* **Frontend Framework:** **React.js (v18+)** - Handles the complex state management for the interactive simulations.
* **Styling Engine:** **Tailwind CSS** - Used to create the responsive, dark-mode "Cyberpunk" aesthetic and handle CSS keyframe animations.
* **Iconography:** **Lucide React** - Provides the consistent, vector-based security icons.
* **Build Tool:** **Vite** - Ensures fast development and optimized production builds.

---

## <u>🚀 Getting Started</u>

Follow these steps to run the project locally on your machine.

### Prerequisites
* **Node.js** (v14 or higher)
* **npm** or **yarn**

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/infosec-learning-hub.git](https://github.com/your-username/infosec-learning-hub.git)
    ```

2.  **Navigate to the project directory**
    ```bash
    cd infosec-learning-hub
    ```

3.  **Install dependencies**
    ```bash
    npm install
    ```

4.  **Start the development server**
    ```bash
    npm run dev
    ```

5.  **Open your browser**
    Navigate to `http://localhost:5173` to view the app.

---

## <u>🤝 Contribution</u>

Contributions are welcome! If you have ideas for new modules (e.g., **RSA Encryption**, **SQL Injection**, or **XSS**), please feel free to fork the repository and submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/NewModule`)
3.  Commit your Changes (`git commit -m 'Add new RSA module'`)
4.  Push to the Branch (`git push origin feature/NewModule`)
5.  Open a Pull Request

---

## <u>📜 License</u>

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  <i>Built with ❤️ for the Open Source Security Community.</i>
</p>
