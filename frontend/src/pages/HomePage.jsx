import React, { useEffect } from "react";
import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  FadeIn,
  Move,
  Sticky,
  ZoomIn,
} from "react-scroll-motion";
import Typewriter from "typewriter-effect/dist/core";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

const HomePage = () => {
  // Scroll animation definitions
  const ZoomInScrollOut = batch(Sticky(), FadeIn(), ZoomIn());
  const FadeUp = batch(Fade(), Move(), Sticky());

  // Add blink effect dynamically
  const blinkAnimationStyle = {
    animation: "blink 1s steps(2, start) infinite",
  };

  useEffect(() => {
    // Create keyframes for the blink effect dynamically
    const styleSheet = document.styleSheets[0];
    const keyframes =
      `@keyframes blink {
        50% { opacity: 0; }
      }`;

    // Append the blink keyframes to the stylesheet
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

    // Initialize the typewriter after the DOM has rendered
    const typewriter = new Typewriter("#typewriter", {
      strings: [
        "Welcome to Cumpost!",
        "A space to share, connect, and thrive.",
        "Join us to share, connect, and flourish",
        "Come for the memes, stay for the existential dread",
      ],
      autoStart: true,
      loop: true,
      delay: 9,
      deleteSpeed: 5,
    });

    return () => {
      // Cleanup typewriter when the component unmounts
      typewriter.stop();
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-full flex-col gap-5">
      <ScrollContainer>
        <ScrollPage>
          <Animator
            animation={batch(Fade(), Sticky(), Move(0, -200))}
            className="flex flex-col justify-center items-center"
          >
            <span className="font-extrabold text-3xl" style={{ fontSize: "30px" }}>
              Welcome to Cumpost🙂
            </span>
            <Animator animation={Fade()}>
              <MdKeyboardDoubleArrowDown
                className="text-white font-extrabold text-4xl"
                style={blinkAnimationStyle}
              />
            </Animator>
          </Animator>
        </ScrollPage>
        <ScrollPage>
          <Animator animation={ZoomInScrollOut}>
            <span id="typewriter" style={{ fontSize: "40px" }}></span>
          </Animator>
        </ScrollPage>
        <ScrollPage>
          <Animator animation={FadeUp}>
            <span style={{ fontSize: "40px" }}>
              Wanna know about the benefits of joining this?🤔
            </span>
          </Animator>
        </ScrollPage>
        <ScrollPage>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "full",
            }}
          >
            <span style={{ fontSize: "40px" }}>
              <Animator animation={Move(-1000, 0)}>
               " Our members are experts at rolling their eyes at life's absurdities "
              </Animator>
              <Animator animation={Move(1000, 0)}>
                " Our members are happy to offer unqualified advice and sympathy"
              </Animator>
              <Animator animation={Move(-1000, 0)}>
                " We'll teach you the art of sarcasm, and you'll be a pro in no time "
              </Animator>
              <Animator animation={Move(1000, 0)}>
                (just kidding, we're not therapists)
              </Animator>
            </span>
          </div>
        </ScrollPage>
        <ScrollPage>
          <Animator animation={batch(Fade(), Sticky())}>
            <span style={{ fontSize: "40px" }}>So,</span>
            <br />
            <span style={{ fontSize: "30px" }}>
              Join us, and together, let's make misery a little more enjoyable🥰!
            </span>
          </Animator>
        </ScrollPage>
      </ScrollContainer>
    </div>
  );
};

export default HomePage;
