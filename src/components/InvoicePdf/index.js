import React, { Fragment } from "react";
import { format } from "date-fns";
import {
  Document,
  Page,
  Text,
  Link,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  image: {
    marginBottom: 20,
    marginHorizontal: 220,
  },
  link: {
    fontSize: 14,
    marginBottom: 30,
    textAlign: "center",
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#2F3044",
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    color: "#6E7183",
  },
  paymentTitle: {
    fontSize: 22,
    textAlign: "center",
    color: "#2F3044",
    marginTop: 20,
    marginBottom: 10,
  },
  paymentTitleTwo: {
    fontSize: 22,
    textAlign: "center",
    color: "#2F3044",
    marginBottom: 30,
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    textDecoration: "underline",
  },
  content: {
    fontSize: 14,
    marginBottom: 15,
  },
  paymentLabel: {
    fontSize: 12,
    marginBottom: 5,
    color: "#6E7183",
  },
  paymentContent: {
    fontSize: 18,
    marginBottom: 15,
  },
  border: {
    marginTop: 15,
    marginBottom: 30,
    borderTop: "1 solid black",
    display: "flex",
    flexDirection: "column",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  paidTitle: {
    fontSize: 24,
    color: "green",
    textAlign: "center",
    marginBottom: 20,
  },
  paidSection: {
    marginBottom: 10,
    flexDirection: "row",
  },
  paidSectionLabel: {
    fontSize: 16,
    color: "#6E7183",
  },
  paidSectionText: {
    fontSize: 16,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const BankText = ({ bankData }) => {
  return (
    <Fragment>
      <Text style={styles.paymentLabel}>Bank</Text>
      <Text style={styles.paymentContent}>{bankData.bank_code}</Text>
      <Text style={styles.paymentLabel}>Virtual Account#</Text>
      <Text style={styles.paymentContent}>{bankData.bank_account_number}</Text>
      <Text style={styles.paymentLabel}>Virtual Account Name</Text>
      <Text style={styles.paymentContent}>{bankData.account_holder_name}</Text>
      <Text style={styles.paymentLabel}>Amount to Pay</Text>
      <Text style={styles.paymentContent}>IDR {bankData.transfer_amount}</Text>
      <View style={styles.border} />
    </Fragment>
  );
};

const RetailerText = ({ retailerData }) => {
  return (
    <Fragment>
      <Text style={styles.paymentLabel}>Retailer Outlet Name</Text>
      <Text style={styles.paymentContent}>
        {retailerData.retail_outlet_name}
      </Text>
      <Text style={styles.paymentLabel}>Payment Code</Text>
      <Text style={styles.paymentContent}>{retailerData.payment_code}</Text>
      <Text style={styles.paymentLabel}>Amount to Pay</Text>
      <Text style={styles.paymentContent}>
        IDR {retailerData.transfer_amount}
      </Text>
      <Text style={styles.border}>&nbsp;</Text>
    </Fragment>
  );
};

const PaymentInfo = ({ data }) => {
  return (
    <Fragment>
      <View style={styles.border} />
      <Text style={styles.paidTitle}>Your payment was successful!</Text>
      <View style={styles.paidSection}>
        <View style={{ flex: 1 }}>
          <Text style={styles.paidSectionLabel}>Amount Paid</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.paidSectionText}>
            IDR {data.adjusted_received_amount}
          </Text>
        </View>
      </View>
      <View style={styles.paidSection}>
        <View style={{ flex: 1 }}>
          <Text style={styles.paidSectionLabel}>Date Paid</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.paidSectionText}>
            {format(new Date(data.paid_at), "dd MMMM yyyy HH:mm a")}
          </Text>
        </View>
      </View>
      <View style={styles.paidSection}>
        <View style={{ flex: 1 }}>
          <Text style={styles.paidSectionLabel}>Payment Channel</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.paidSectionText}>
            {data.payment_channel.replace("_", " ")}
          </Text>
        </View>
      </View>
    </Fragment>
  );
};

// Create Document Component
const MyPdf = ({ data }) => {
  console.log(data);

  return (
    <Document>
      <Page style={styles.body}>
        <Image style={styles.image} src="/xendit.png" />

        <Text style={styles.header}>Invoice from {data.merchant_name}</Text>
        <Text style={styles.subHeader}>Billed to {data.payer_email}</Text>
        <Text style={styles.subHeader}>Invoice #: {data.external_id}</Text>

        <Text style={styles.paymentTitle}>IDR{data.amount}</Text>
        <Text style={{ ...styles.paymentTitleTwo }}>
          due on {format(new Date(data.expiry_date), "dd MMMM yyyy HH:mm a")}
        </Text>

        {data.status !== "PAID" && (
          <Link style={styles.link} src={data.invoice_url}>
            Click here for more payment options.
          </Link>
        )}

        {data.status === "PAID" && <PaymentInfo data={data} />}

        <View style={styles.border} />
        <Text style={styles.title}>Description</Text>
        <Text style={styles.content}>{data.description}</Text>

        <Text style={styles.header} break>
          PAYMENT METHODS
        </Text>
        <Text style={styles.title}>Bank Transfer</Text>
        {(data.available_banks || []).map((bankData, index) => (
          <BankText bankData={bankData} key={index} />
        ))}

        <Text style={styles.header} break>
          PAYMENT METHODS
        </Text>
        <Text style={styles.title}>Retail Outlets</Text>
        {(data.available_retail_outlets || []).map((retailerData, index) => (
          <RetailerText retailerData={retailerData} key={index} />
        ))}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

const InvoicePdfLink = (props) => {
  if (!props.data) {
    return <div />;
  }

  return (
    <PDFDownloadLink
      className="block mx-auto rounded-lg py-2 px-4 text-white shadow-lg text-center
    bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      document={<MyPdf data={props.data} />}
      fileName="invoice.pdf"
    >
      {({ loading }) => (loading ? "Loading document..." : "Download Invoice")}
    </PDFDownloadLink>
  );
};

export default InvoicePdfLink;
