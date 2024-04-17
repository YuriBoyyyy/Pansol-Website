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
  fullName: string;
  address: string;
  location: string;
  structure: string;
  kapilya: string;
  bahayNayon: string;
  paaralan: string;
  others: string;
}

function PermitTemplate(props: IndigencyProps) {
  const {
    fullName,
    address,
    location,
    structure,
    kapilya,
    bahayNayon,
    paaralan,
    others,
  } = props;

  const date = new Date();

  const formattedDate = date.toLocaleDateString("fil-PH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const parts = formattedDate.split(" ");
  const month = parts[0];
  const day = parts[1].replace(",", "");
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
              REPUBLIKA NG PILIPINAS
            </Text>
            <Text style={styles.header} fixed>
              LALAWIGAN OF QUEZON
            </Text>
            <Text style={styles.header} fixed>
              BAYAN OF LOPEZ
            </Text>
            <Text style={styles.header} fixed>
              BARANGAY PANSOL
            </Text>
          </View>
          <Image src={LopezLogo} style={styles.image} />
        </View>
        <Text style={styles.subtitle}>Tanggapan ng Sangguniang Barangay</Text>
        <Text style={styles.title}>BARANGAY PERMIT</Text>
        <Text
          style={{
            marginTop: 12,
            marginBottom: 12,
            fontSize: 13,
            fontWeight: "light",
            textAlign: "justify",
            fontFamily: "Times-Roman",
          }}
        >
          Sa mga kinauukulan,
        </Text>
        <Text style={styles.text}>
          Sang ayon sa batas na itinatadhana ng kodigo ng Lokal na Pamahalaan ng
          Pilipinas, ang katibayan ng Pagbibigay ng kapahintulutan ay iginawad
          kay:
        </Text>
        <Text style={styles.text}>{`Pangalan ng Aplikante: ${fullName}`}</Text>
        <Text style={styles.text}>{`Tirahan ng Aplikante: ${address}`}</Text>
        <Text
          style={styles.text}
        >{`Kaanyuan at uri ng Istraktura: ${structure}`}</Text>
        <Text style={styles.text}>{`Lokasyon: ${location}`}</Text>
        <Text style={styles.text}>
          Tinatayang distansya mula sa mga sumusunod na mga palatandaan at
          pambarangay na istraktura.
        </Text>
        <Text style={styles.text}>{`Bahay nayon: ${bahayNayon}`}</Text>
        <Text style={styles.text}>{`Kapilya: ${kapilya}`}</Text>
        <Text style={styles.text}>{`Paaralan: ${paaralan}`}</Text>
        <Text style={styles.text}>{`Iba pa: ${others}`}</Text>
        <Text style={styles.text}>{`Layunin: Locational Clearance `}</Text>
        <Text style={styles.text}>
          {`Iginawad ngayong Ika-${day} ng ${month} at maaring gamitin
          hanggang ika-_______ng Disyembre ng taong kasalukuyan.`}
        </Text>
        <View
          style={{
            display: "flex",
            alignItems: "flex-end",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              marginTop: 30,
              fontSize: 13,
              fontWeight: "medium",
              textAlign: "right",
              fontFamily: "Times-Roman",
            }}
          >{`JOSE R. MERCADO `}</Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "light",
              textAlign: "right",
              fontFamily: "Times-Roman",
            }}
          >{`Punong Barangay `}</Text>
        </View>
        <Text style={styles.text2}>{`OR no.: `}</Text>
        <Text style={styles.text2}>{`Amount: `}</Text>
        <Text style={styles.text2}>{`Date: `}</Text>
        <Text style={styles.pageNumber}>
          ~ Not valid without official SEAL, and after 6 MONTHS from the date of
          issue ~
        </Text>
      </Page>
    </Document>
  );
}

export default PermitTemplate;

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
    marginTop: 0,
    marginBottom: 5,
    fontSize: 13,
    fontWeight: "light",
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  text2: {
    textIndent: 0,
    marginTop: 0,
    marginBottom: 5,
    fontSize: 13,
    fontWeight: "normal",
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
