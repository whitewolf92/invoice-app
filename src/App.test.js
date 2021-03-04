import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "regenerator-runtime/runtime";

import App from "./App";
import apiAgent from "./api/apiAgent";

it("renders initial page", () => {
  render(<App />);
  const mainText = screen.getByText(/Xendit PDF Exporter/i);
  expect(mainText).toBeInTheDocument();

  const label = screen.getByText(/Invoice ID/i);
  expect(label).toBeInTheDocument();
});

describe("form", () => {
  it("input updates on value change", () => {
    render(<App />);

    const fakeSearchQuery = "testing search query";
    const input = screen.getByLabelText("invoice-id");

    expect(input.value).toBe("");
    fireEvent.change(input, { target: { value: fakeSearchQuery } });
    expect(screen.getByDisplayValue(fakeSearchQuery)).toBeInTheDocument();
  });
});

describe("generate invoice", () => {
  let InvoiceGetSpy = null;

  beforeAll(() => {
    InvoiceGetSpy = jest.spyOn(apiAgent.Invoice, "getById");
    InvoiceGetSpy.mockImplementation((id) => {
      if (id === "111") {
        return {
          data: {
            adjusted_received_amount: 100000000,
            amount: 100000000,
            available_banks: [
              {
                account_holder_name: "PAYLOR",
                bank_account_number: "9921522752965",
                bank_branch: "Virtual Account",
                bank_code: "BRI",
                collection_type: "POOL",
                identity_amount: 0,
                transfer_amount: 100000000,
              },
              {
                account_holder_name: "PAYLOR",
                bank_account_number: "8860830952965",
                bank_branch: "Virtual Account",
                bank_code: "MANDIRI",
                collection_type: "POOL",
                identity_amount: 0,
                transfer_amount: 100000000,
              },
            ],
            created: "2021-03-02T15:10:09.321Z",
            credit_card_charge_id: "603e55b14b286d0020827267",
            currency: "IDR",
            description: "Please pay",
            expiry_date: "2021-03-03T15:09:30.114Z",
            external_id: "paylor",
            id: "603e55514447344031dc7e75",
            invoice_url:
              "https://checkout-staging.xendit.co/web/603e55514447344031dc7e75",
            merchant_name: "PayLor.Me",
            merchant_profile_picture_url:
              "https://du8nwjtfkinx.cloudfront.net/xendit.png",
            paid_amount: 100000000,
            paid_at: "2021-03-02T15:11:45.528Z",
            payer_email: "loy_qihao_cedric@hotmail.com",
            payment_channel: "CREDIT_CARD",
            payment_method: "CREDIT_CARD",
            should_exclude_credit_card: false,
            should_send_email: false,
            status: "PAID",
            updated: "2021-03-02T15:11:45.800Z",
            user_id: "6013a150e29d3d060306c9c0",
          },
        };
      } else {
        return Promise.reject(new Error("fail"));
      }
    });
  });

  afterAll(() => {
    InvoiceGetSpy.mockClear();
  });

  describe("when no invoice matches input invoice id", () => {
    it("should display Error message", async () => {
      render(<App />);

      const fakeSearchQuery = "testing search query";
      const input = screen.getByLabelText("invoice-id");

      expect(input.value).toBe("");
      fireEvent.change(input, { target: { value: fakeSearchQuery } });

      const button = screen.getByLabelText("search-btn");
      await act(async () => {
        fireEvent.click(button);
      });

      expect(
        screen.getByText(/Invoice not found. Please enter again./i)
      ).toBeInTheDocument();
    });
  });
});
