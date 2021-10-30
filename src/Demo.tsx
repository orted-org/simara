import { useEffect, useState } from "react";
import Badge from "./Components/Badge";
import Button from "./Components/Button";
import Checkbox from "./Components/Checkbox";
import { IconChevronRight, IconMail, IconPhotograph } from "./Components/Icons";
import Modal from "./Components/Modal";
import RadioGroup from "./Components/RadioGroup";
import Select from "./Components/Select";
import Switch from "./Components/Switch";
import TextArea from "./Components/TextArea";
import TextField from "./Components/TextField";
import { useSimara, useSimaraToast } from "./Global/Context";

function Demo() {
  const [terms, setTerms] = useState(false);
  const [gender, setGender] = useState("");
  const [noti, setNoti] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useSimara();
  useEffect(() => {}, []);
  const toast = useSimaraToast();
  return (
    <>
      {modal && (
        <Modal
          cSize="small"
          onCloseRequest={() => {
            setModal(false);
          }}
        />
      )}
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: theme.Colors.background,
          color: theme.Colors.text.dil0,
        }}
      >
        <div
          style={{
            width: "440px",
            height: "fit-content",
            borderRadius: "6px",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: "10px",
            maxWidth: "90%",
          }}
        >
          <h2>
            Register <Badge isPill>10</Badge>{" "}
          </h2>

          <TextField
            containerStyle={{ width: "100%", marginTop: "10px" }}
            placeholder="Full Name"
            iconBefore={IconMail}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <h5>Gender</h5>
            <RadioGroup
              style={{ flexDirection: "row" }}
              radioStyles={{ marginLeft: "10px" }}
              value={gender}
              onChange={(e) => {
                setGender(e);
              }}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />
          </div>

          <TextArea
            style={{ marginTop: "10px", width: "100%", resize: "none" }}
            placeholder="Short Description"
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Select style={{ width: "fit-content" }}>
              <option value="male">Student</option>
              <option value="female">Professor</option>
            </Select>
            <Button
              style={{
                marginLeft: "10px",
              }}
              cSize="medium"
              isShrunken
              appearance="primary"
              intent="danger"
              iconBefore={IconPhotograph}
              onClick={() => {
                toast({
                  title: "Account Created",
                  duration: 10000,
                  message: "Your account has been successfully created.",
                });
                setModal(true);
              }}
            >
              Add Image
            </Button>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <h5>Enable push notification for latest updates?</h5>
            <Switch
              isOn={noti}
              onTap={() => {
                toast({
                  intent: "success",
                  title: "Account Created",
                  duration: 10000,
                  message: "Your account has been successfully created.",
                });
                setNoti((ps) => !ps);
              }}
            />
          </div>
          <Checkbox
            style={{ marginTop: "60px" }}
            isChecked={terms}
            onTap={() => {
              setTerms((ps) => !ps);
              toast({
                intent: "warning",
                title: "Account Created",
                duration: 10000,
                message: "Your account has been successfully created.",
              });
            }}
            cSize="small"
            label="By logging in you accept our Privacy Policy and Terms of Service."
          />
          <Button
            intent="normal"
            appearance="primary"
            isLoading={loading}
            iconAfter={IconChevronRight}
            onClick={() => {
              toast({
                intent: "danger",
                title: "Account Created",
                duration: 10000,
                message: "Your account has been successfully created.",
              });
              toast({
                intent: "success",
                title: "Account Created",
                duration: 10000,
                message: "Your account has been successfully created.",
              });
              toast({
                intent: "warning",
                title: "Account Created",
                duration: 10000,
                message: "Your account has been successfully created.",
              });
            }}
            cSize="large"
            style={{ width: "100%", marginTop: "10px" }}
          >
            Register
          </Button>
        </div>
      </div>
    </>
  );
}

export default Demo;
