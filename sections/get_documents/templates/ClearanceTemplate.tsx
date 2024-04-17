import ReactPDF, {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import moment from "moment";
import PansolLogo from "../../../assets/Pansol.png";
import LopezLogo from "../../../assets/lopez.png";

interface IndigencyProps {
  firstName: string;
  lastName: string;
  middleName: string;
  age: number | undefined;
  reason: string;
}

function ClearanceTemplate(props: IndigencyProps) {
  const { age, firstName, lastName, middleName, reason } = props;

  const date = new Date();

  const formattedDate = moment(date).format("MMMM Do YYYY");

  const parts = formattedDate.split(" ");
  const month = parts[0];
  const day = parts[1];
  const year = parts[2];

  return (
    <Document>
      <Page style={styles.body}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image style={styles.image} src={PansolLogo} />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text style={styles.header} fixed>
              REPUBLIC OF THE PHILIPPINES
            </Text>
            <Text style={styles.header} fixed>
              PROVINCE OF QUEZON
            </Text>
            <Text style={styles.header} fixed>
              MUNICIPALITY OF LOPEZ
            </Text>
            <Text style={styles.header} fixed>
              BARANGAY PANSOL
            </Text>
          </View>
          <Image src={LopezLogo} style={styles.image} />
        </View>
        <Text style={styles.subtitle}>Office of the Sangguniang Barangay</Text>
        <Text style={styles.title}>BARANGAY CLEARANCE</Text>
        <Text
          style={{
            marginTop: 12,
            marginBottom: 12,
            fontSize: 15,
            fontWeight: "light",
            textAlign: "justify",
            fontFamily: "Times-Roman",
          }}
        >
          To whom it may concern,
        </Text>
        <Text style={styles.text}>
          {`This is to certify that ${firstName} ${middleName} ${lastName}, ${age} years of age, (Single/married/widow/er) is a Filipino citizen, a bonafide resident of this barangay, a law-abiding citizen, and possesses Good Moral Character.`}
        </Text>
        <Text style={styles.text}>
          This certifies further that he/she has no derogatory record or pending
          criminal case filed against him/her as of this date.
        </Text>
        <Text style={styles.text}>
          {`Issued upon request of the interested party this ${day} day of ${month} ${year} at Brgy. Pansol Lopez, Quezon for ${reason}.`}
        </Text>
        <View
          style={{
            marginTop: 30,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              marginBottom: 20,
              fontSize: 15,
              fontWeight: "light",
              textAlign: "left",
              fontFamily: "Times-Roman",
            }}
          >{`Conforme, `}</Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "medium",
              textAlign: "left",
              fontFamily: "Times-Roman",
            }}
          >{`___________________ `}</Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "light",
              textAlign: "left",
              fontFamily: "Times-Roman",
            }}
          >{`Applicant's Signature `}</Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                marginTop: 50,
                marginBottom: 40,
                fontSize: 15,
                fontWeight: "light",
                textAlign: "left",
                fontFamily: "Times-Roman",
              }}
            >{`Certified by, `}</Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "medium",
                textAlign: "left",
                fontFamily: "Times-Roman",
              }}
            >{`MARIA ZONABEL A. ESCLANDA `}</Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "light",
                textAlign: "left",
                fontFamily: "Times-Roman",
              }}
            >{`Barangay Secretary `}</Text>
          </View>
          <View
            style={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                marginTop: 50,
                marginBottom: 40,
                fontSize: 15,
                fontWeight: "light",
                textAlign: "right",
                fontFamily: "Times-Roman",
              }}
            >{`Noted by, `}</Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "medium",
                textAlign: "right",
                fontFamily: "Times-Roman",
              }}
            >{`JOSE R. MERCADO `}</Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "light",
                textAlign: "right",
                fontFamily: "Times-Roman",
              }}
            >{`Barangay Captain `}</Text>
          </View>
        </View>
        <Text style={styles.pageNumber}>
          ~ Not valid without official SEAL, and after 6 MONTHS from the date of
          issue ~
        </Text>
      </Page>
    </Document>
  );
}

export default ClearanceTemplate;

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    padding: 50,
  },
  title: {
    fontSize: 28,
    marginTop: 30,
    marginBottom: 30,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  text: {
    textIndent: 50,
    marginTop: 12,
    marginBottom: 12,
    fontSize: 15,
    fontWeight: "light",
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    width: 80,
    height: 80,
  },
  header: {
    fontSize: 12,
    textAlign: "center",
    color: "grey",
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
