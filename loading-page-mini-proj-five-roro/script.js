//Bounce animation
let bounceAnimation;

//Hide the loader
function hideLoader() {
  gsap.to(".loader", {
    opacity: 0,
    duration: 1,
    onComplete: () => {
      document.querySelector(".loader").style.display = "none";
      document.querySelector(".message").style.display = "block";
      // Fade out the message
      gsap.delayedCall(1.5, () => {
        gsap.to(".message", {
          opacity: 0,
          duration: 1,
          onComplete: showMain,
        });
      });
    },
  });
}

//Show the main content
function showMain() {
  document.querySelector(".message").style.display = "none";
  document.querySelector(".main-content").style.display = "block";
  gsap.fromTo(".main-content", { opacity: 0 }, { opacity: 1, duration: 1 });
}

// Animate letters
function animateLetters() {
  const letters = gsap.utils.toArray(".letter");

  // Bounce animation
  bounceAnimation = gsap.fromTo(
    letters,
    { opacity: 0.1, scale: 0.5 },
    {
      opacity: 1,
      scale: 1,
      duration: 1,
      stagger: 0.5,
      repeat: -1,
      ease: "bounce.out",
    }
  );

  // Stop bounce animation before split
  gsap.delayedCall(7, () => {
    bounceAnimation.kill();
  });

  // Split "Ro" after delay
  gsap.delayedCall(7, () => {
    gsap.to("#left-r, #left-o", {
      x: "-20vw", // Slide left letters to the left
      duration: 1,
      ease: "power2.out",
    });
    gsap.to("#right-r, #right-o", {
      x: "20vw", // Slide right letters to the right
      duration: 1,
      ease: "power2.out",
      onComplete: hideLoader,
    });
  });
}

// Start the animation
animateLetters();
