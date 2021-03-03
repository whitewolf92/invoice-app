import React, { Fragment } from "react";
import {
  Document,
  Page,
  Text,
  Link,
  View,
  StyleSheet,
  PDFDownloadLink,
  BlobProvider,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  image: {
    marginBottom: 20,
    marginHorizontal: 220,
  },
  link: {
    margin: 15,
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
    marginBottom: 40,
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 16,
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
    marginTop: 10,
    borderBottom: "5px solid #000",
    marginBottom: 10,
    width: 1000,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
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
  console.log(bankData);
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
      <Text style={styles.border}>&nbsp;</Text>
    </Fragment>
  );
};

const MerchantText = ({ merchantData }) => {
  console.log(merchantData);
  return (
    <Fragment>
      <Text style={styles.paymentLabel}>Retailer Outlet Name</Text>
      <Text style={styles.paymentContent}>
        {merchantData.retail_outlet_name}
      </Text>
      <Text style={styles.paymentLabel}>Payment Code</Text>
      <Text style={styles.paymentContent}>{merchantData.payment_code}</Text>
      <Text style={styles.paymentLabel}>Amount to Pay</Text>
      <Text style={styles.paymentContent}>
        IDR {merchantData.transfer_amount}
      </Text>
      <Text style={styles.border}>&nbsp;</Text>
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
          due on {data.expiry_date}
        </Text>

        <Text style={styles.title}>Description</Text>
        <Text style={styles.content}>{data.description}</Text>

        <Text style={styles.header} break>
          PAYMENT METHODS
        </Text>
        <Text style={styles.title}>Bank Transfer</Text>
        {data.available_banks.map((bankData, index) => (
          <BankText bankData={bankData} key={index} />
        ))}

        <Text style={styles.title} break>
          Retail Outlets
        </Text>
        {data.available_retail_outlets.map((merchantData, index) => (
          <MerchantText merchantData={merchantData} key={index} />
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
    return <div></div>;
  }

  return (
    <PDFDownloadLink
      className="block mx-auto rounded-lg py-2 px-4 text-white shadow-lg text-center
    bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      document={<MyPdf data={props.data} />}
      fileName="invoice.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download Invoice"
      }
    </PDFDownloadLink>
  );
};

export default InvoicePdfLink;
