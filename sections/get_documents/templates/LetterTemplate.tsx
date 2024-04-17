import ReactPDF, {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import PansolLogo from "../../../assets/Pansol.png";
import LopezLogo from "../../../assets/lopez.png";

interface LetterProps {
  firstName: string;
  lastName: string;
  middleName: string;
  reason: string;
  purok: string;
  age: number | undefined;
  contactNumber: number | undefined;
}

function LetterTemplate(props: LetterProps) {
  const { age, contactNumber, firstName, lastName, middleName, purok, reason } =
    props;

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
              LALAWIGAN NG QUEZON
            </Text>
            <Text style={styles.header} fixed>
              BARANGAY PANSOL
            </Text>
          </View>
          <Image src={LopezLogo} style={styles.image} />
        </View>
        <Text style={styles.subtitle}>Tanggapan ng Punong Baraggay</Text>
        <Text style={styles.title}>PAGPAPATUNAY</Text>
        <Text style={styles.text}>
          {`Pinatutunayan nito batay sa tala ng Barangay na si ${firstName} ${middleName} ${lastName}, ${age} taong gulang may asawa/walang asawa/balo, naninirahan sa Purok ${purok}, Barangay Pansol Lopez, Quezon na may contact number na ${contactNumber}.`}
        </Text>
        <Text style={styles.text}>
          {`Pinatutunayan ko pa rin na ang nabanggit na pangalan sa itaas ay sadyang nabibilang sa mahirap na pamilya at walang sapat na pinagkakakitaan upang masuportahan ang ${reason}.`}
        </Text>
        <Text style={styles.text}>
          {`Ang Pagpapatunay na ito ay ipinagkaloob sa kanila ngayong ika-${day} ng ${month}, ${year} upang magamit sa lahat ng transakyong Legal `}
        </Text>
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
            >{`Pinatutunayan, `}</Text>
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
            >{`Kalihim ng Barangay `}</Text>
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
            >{`Binigyang Pansin, `}</Text>
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
            >{`Punong Barangay `}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default LetterTemplate;

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
