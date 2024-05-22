import { GridStackNode } from "gridstack";

export function attachRotationListener(elements: GridStackNode[]) {
  elements.forEach((element) => {
    const htmlElement = element.el as HTMLElement;

    // Initialize rotation state
    let rotationAngle = 0; // Start at 0 degrees

    // Function to handle rotation
    const rotateWidget = () => {
      // Calculate the next rotation angle
      rotationAngle += 90;
      // Cycle back to 0 if we reach 360 degrees
      rotationAngle %= 360;

      // Apply the rotation
      htmlElement.style.transform = `rotate(${rotationAngle}deg)`;

      // Toggle the 'rotated' class to visually indicate rotation
      htmlElement.classList.toggle("rotated");
    };

    // Check if the listener has already been attached
    if (!htmlElement.classList.contains("listener-attached")) {
      const rotateButton = htmlElement.querySelector(".rotate-button");
      if (rotateButton) {
        rotateButton.addEventListener("click", rotateWidget);
      }

      // Mark the element to indicate the listener has been attached
      htmlElement.classList.add("listener-attached");
    }
  });
}
