import { IonPage, IonContent, IonButton, IonIcon } from "@ionic/react";
import logo from "../assets/logo.svg";
import watermind from "../assets/watermind.svg";
import notecard from "../assets/notecard.svg";
import filter from "../assets/filter.svg";
import publicNote from "../assets/publicnote.svg";
import graph from "../assets/graph.svg";

import check from "../assets/check-badge.svg";
import chevronRight from "../assets/chevron-right.svg";
import graphIcon from "../assets/graph-icon.svg";

import inboxStackIcon from "../../../assets/iconout/inbox-stack.svg";
import heartIcon from "../../../assets/iconout/heart-full.svg";
import { Button, Icon } from "../../../components";
import { LandingHeader } from "../components";

export const LandingPage = () => {
  return (
    <IonPage>
      <IonContent className="no-padding">
        <div className="snap-y snap-mandatory overflow-y-scroll max-h-screen">
          <div className="h-screen bg-white px-16 pt-5 col justify-between snap-start">
           
            <LandingHeader />

            <div>
              <p className="font-display font-semibold text-[48px] w-fit mx-auto">
                Water your mind
              </p>
              <p className="font-display font-semibold text-[24px] w-fit mx-auto">
                Share your knowledge
              </p>
            </div>
            <p className="font-semibold text-sm w-[25%] mx-auto text-center">
              Nōto is an app that allows you to capture thoughts and ideas at
              the 'speed of thought'
            </p>

            <img
              src={watermind}
              alt="drawing of a woman's face whose head is being watered by smaller people"
              className="mx-auto aspect-[7.1/4.42] w-[45%] mb-4"
            />
          </div>

          <div className="h-screen bg-indigo-100 px-16 col justify-evenly items-center snap-start">
            <div className="col gap-7">
              <p className="font-display font-semibold text-5xl w-fit mx-auto">
                Presenting the notecard
              </p>

              <div className="flex gap-3 items-center justify-center">
                <IonIcon icon={check} />
                <p className="font-display font-semibold ">
                  Innovative note-taking structure
                </p>
              </div>
            </div>

            <img src={notecard} alt="notecard explained" className="w-[60%]" />

            <div className="col items-center">
              <p className="font-medium">
                A more simple way to organize and find information.
              </p>
              <p className="font-medium w-4/5 text-center">
                The notecard is designed to deliver a powerful knowledge
                foundation.
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <a
                className="font-sm font-semibold text-indigo-600"
                href="/download"
              >
                Try it now
              </a>
              <IonIcon icon={chevronRight} />
            </div>
          </div>

          <div className="h-screen bg-white snap-start">
            <div className="grid grid-cols-2 gap-32 items-center h-screen">
              <div className="flex justify-end items-center">
                <img
                  src={filter}
                  alt="collage of tags and other filtering components"
                />
              </div>

              <div className="w-1/2">
                <p className="font-display text-5xl font-semibold mb-8">
                  Quick and easy access
                </p>

                <div className="flex gap-3 mb-20">
                  <Icon
                    icon={inboxStackIcon}
                    className="!h-6 !w-6 text-indigo-500"
                  />
                  <p className="font-display font-semibold">
                    Effortless organization
                  </p>
                </div>

                <p className="font-medium mb-6 ">
                  Blazing fast finding. You can search, sort and filter to
                  easily find any note.
                </p>
                <p className="font-medium ">
                  Create links between notes through the use of tags. You can
                  even connect notes directly with inline links.
                </p>
              </div>
            </div>
          </div>

          <div className="h-screen bg-indigo-100 snap-start">
            <div className="grid grid-cols-2 gap-32 items-center h-screen">
              <div className="col items-end">
                <p className="font-display text-5xl font-semibold mb-8 w-[60%]">
                  Publish, like and fork notes
                </p>

                <div className="flex gap-3 mb-16 w-[60%]">
                  <Icon
                    icon={heartIcon}
                    className="!h-6 !w-6 text-indigo-500"
                  />
                  <p className="font-display font-semibold">
                    Sharing is caring
                  </p>
                </div>

                <p className="font-medium mb-6 w-[60%]">
                  You can keep your notes to yourself, or you can share them
                  with the world.
                </p>
                <p className="font-medium w-[60%]">
                  You can also like a note you’ve read or even copy it to your
                  own folder and edit it how you prefer.
                </p>
              </div>

              <div>
                <img src={publicNote} alt="public notecard" />
              </div>
            </div>
          </div>

          <div className="h-screen bg-white snap-start">
            <div className="grid grid-cols-2 gap-32 items-center h-screen">
              <div className="flex justify-end items-center">
                <img
                  src={graph}
                  alt="connection graph between tags and notes"
                />
              </div>

              <div className="w-1/2">
                <p className="font-display text-5xl font-semibold mb-6">
                  Watch for connections
                </p>

                <div className="flex gap-3 mb-16">
                  <IonIcon icon={graphIcon} />
                  <p className="font-display font-semibold">Graph view</p>
                </div>

                <p className="font-medium mb-6 ">
                  The graph is your knowledge at a glance. It shows connections
                  around you.
                </p>
                <p className="font-medium ">
                  Discover new connections, research, and boost up your drive.
                  Graph shows connections around you. Get inspired while
                  writing.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white col items-center py-16 snap-start">
            <p className="font-display font-semibold text-5xl">
              Get Nōto for free
            </p>

            <div className="my-6">
              <p className="font-medium text-center">Download the app now</p>
              <p className="font-medium text-neutr">
                Only available to iOS and Android
              </p>
            </div>

            <Button className="my-7" routerLink="/download">
              Download now
            </Button>

            <p className="text-sm text-neutral-500 font-medium">
              No ads. No trials.
            </p>
          </div>

          <div className="border-y border-neutral-200 grid grid-cols-4 px-16 py-9 bg-white snap-start">
            <div>
              <img src={logo} alt="logo for noto" />
            </div>
            <div className="col items-center gap-6">
              <p className="font-display font-semibold">Product</p>
              <div className="col gap-3 items-center">
                <p className="font-medium">Features</p>
                <a className="font-medium" href="/download">
                  Download
                </a>
                <a className="font-medium" href="/changelog">
                  Changelog
                </a>
              </div>
            </div>

            <div className="col items-center gap-6">
              <p className="font-display font-semibold">Resources</p>
              <div className="col gap-3 items-center">
                <p className="font-medium">Help</p>
                <p className="font-medium">Docs</p>
              </div>
            </div>

            <div className="col items-center gap-6">
              <p className="font-display font-semibold">Company</p>
              <div className="col gap-3 items-center">
                <p className="font-medium">About</p>
                <a className="font-medium" href="/download">
                  Download
                </a>
              </div>
            </div>
          </div>

          <footer className="bg-white flex justify-between px-16 snap-start">
            <div className="col gap-1 items-center justify-center">
              <p className="font-bold text-xl">Enjoy taking notes</p>
              <p>Join thousands of users</p>
            </div>
            <Button className="my-7" routerLink="/download">
              Download now
            </Button>
          </footer>
        </div>
      </IonContent>
    </IonPage>
  );
};
