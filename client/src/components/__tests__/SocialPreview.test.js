import React from "react";
import { render, screen, fireEvent} from "@testing-library/react";
import Preview from "../Preview";
import SocialPreview from "../SocialPreview";

describe("Social Preview Component", () => {
  test("renders Social Preview component", () => {
    render(<SocialPreview />);
    const input = screen.getByTestId("search-bar");
    expect(input.placeholder).toMatch("https://www.examplewebsite.com");
    const button = screen.getByTestId("search-btn");
    expect(button.textContent).toMatch("Search");
  });
  test("search bar works", async () => {
    render(<SocialPreview />);
    const input = screen.getByTestId("search-bar");
    expect(input.placeholder).toMatch("https://www.examplewebsite.com");
    const button = screen.getByTestId("search-btn");
    expect(button.textContent).toMatch("Search");
    fireEvent.change(input, {
      target: { value: "nytimes.com/marketing/cooking/app" },
    });
    fireEvent.click(button);
    expect(screen.getByTestId("search-err").textContent).toContain(
      "Please fix"
    );
    fireEvent.change(input, {
      target: {
        value:
          "https://nytimes.com/marketing/cooking/app",
      },
    });
    fireEvent.click(button);
    expect(screen.queryByTestId("search-err")).toBeNull();
  });
  test("meta data info table and social cards appear", async () => {
    render(
      <Preview
        data={{
          url: {
            content: "https://www.nytimes.com/marketing/cooking/app",
            name: "og:url",
          },
          title: {
            content: "Download the NYT Cooking app.",
            name: "og:title",
          },
          description: {
            content: "Get recipes and inspiration daily on iOS or Android",
            name: "og:description",
          },
          type: { content: "website", name: "og:type" },
          image: {
            content:
              "https://mwcm.nyt.com/dam/LP/cooking/download/social-card/facebook.png",
            name: "og:image",
          },
          twitterCard: { content: "summary", name: "twitter:card" },
          twitterSite: { content: "@nytfood", name: "twitter:site" },
          twitterTitle: {
            content: "Download the NYT Cooking app.",
            name: "twitter:title",
          },
          twitterDescription: {
            content: "Get recipes and inspiration daily on iOS or Android.",
            name: "twitter:description",
          },
          twitterImage: {
            content:
              "https://mwcm.nyt.com/dam/LP/cooking/download/social-card/twitter.png",
            name: "twitter:image",
          },
          twitterImageAlt: {
            content: "Download the NYT Cooking app.",
            name: "twitter:image:alt",
          },
          pageTitle: "Download the NYT Cooking app.",
          searchedUrl: "https://nytimes.com/marketing/cooking/app",
        }}
      />
    );
    expect(screen.getByTestId("meta-info-title").textContent).toContain(
      "Meta Tags"
    );
    expect(screen.getByTestId("facebook-card").textContent).toContain(
      "Facebook"
    );
    expect(screen.getByTestId("facebook-card-title").textContent).toContain(
      "Download the NYT Cooking app"
    );
    expect(screen.getByTestId("facebook-card-description").textContent).toContain(
      "Get recipes and inspiration daily on iOS or Android"
    );
    expect(screen.getByTestId("facebook-card-url").textContent).toContain(
      "nytimes.com"
    );
    expect(screen.getByTestId("twitter-card").textContent).toMatch(
      "Twitter"
    );
  });
});
