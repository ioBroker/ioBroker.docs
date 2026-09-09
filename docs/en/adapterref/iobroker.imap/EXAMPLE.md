---
chapters: {"pages":{"en/adapterref/iobroker.imap/README.md":{"title":{"en":"ioBroker.imap"},"content":"en/adapterref/iobroker.imap/README.md"},"en/adapterref/iobroker.imap/EXAMPLE.md":{"title":{"en":"ioBroker.imap"},"content":"en/adapterref/iobroker.imap/EXAMPLE.md"}}}
---
![Logo](../../admin/imap.png)

# ioBroker.imap

[Return to description](/#/adapters/imap)

## [A VIS from Sigi](https://forum.iobroker.net/topic/28717/vis-von-sigi234/2?_=1677788114522)

All mails

```
["ALL"]
```

All mails with flag „ANSWERED“

```
["ANSWERED"]
```

All mails do not have the "UNANSWERED" flag

```
["UNANSWERED"]
```

All mails with flag „DELETED“

```
["DELETED"]
```

All mails do not have the „UNDELETED“ flag

```
["UNDELETED"]
```

All mails with flag „DRAFT“

```
["DRAFT"]
```

All mails do not have the „UNDRAFT“ flag

```
["UNDRAFT"]
```

All mails with flag „FLAGGED“

```
["FLAGGED"]
```

All mails do not have the „UNFLAGGED“ flag

```
["UNFLAGGED"]
```

All mails with the flag "RECENT" and no "SEEN" flag

```
["NEW"]
```

All mails do not have the „RECENT“ flag

```
["OLD"]
```

All mails with flag „SEEN“

```
["SEEN"]
```

All mails with flag „UNSEEN“

```
["UNSEEN"]
```

All mails with the flag "RECENT" -> New mails and not yet seen

```
["RECENT"]
```

Also several possible:

```
["UNSEEN", "FLAGGED"]
```

All emails received between March 1st, 2023 and March 13th, 2023.

```
["ALL",["SINCE","Mar 01, 2023"],["BEFORE","Mar 13, 2023"]]
```

All mails with the flag "SEEN" that have been received since June 1st, 2022 (also with prime time).

```
["ALL",["SINCE", "June 01, 2023"]]
["ALL",["SINCE", "Jun 01, 2023"]]
["ALL",["SINCE", '2023-06-01 23:59:00'] ]
```

All mails from github@luckyskills.de

```
["ALL", ["HEADER", "FROM", "github@luckyskills.de"]]
```

All mails from github@luckyskills.de since March 1st, 2023

```
["ALL", ["HEADER", "FROM", "github@luckyskills.de"], ["SINCE", "Mar 01, 2023"]]
```

# Examples Blockly and Javascript

-   Change query:

```json
sendTo("imap.0", "getBlockly", {search: '["UNSEEN"]', max: 20, device: 'all'});
```

-   Load the unread emails of the last 24 hours from an IMAP connection:

```json
var delay = 24 * 3600 * 1000;
var yesterday;
yesterday = new Date();
yesterday.setTime(Date.now() - delay);
yesterday = yesterday.toISOString();
var searchCriteria = ['UNSEEN', ['SINCE', yesterday]];
var fetchOptions = { bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'], struct: true };
sendTo("imap.0", "getIMAPRequest", {
  name: "github@luckyskills.de",
   max: 20,
   search: searchCriteria,
   fetch:  {"fetch": false, "uid": [1,2,3,4]},
   bodie: fetchOptions,
   parse: true,
}, async function (result) {
    console.log(JSON.stringify(result));
});
```

-   Load the unread emails of the last 24 hours from an IMAP connection as Blockly:

```
<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="m(W@npD`3A65xYwKnwcj">delay</variable>
    <variable id="hcM*MvQp$7|~Sa0DZ!Ab">yesterday</variable>
    <variable id="GpMd@6@ZS_+%P5uFU6Xf">searchCriteria</variable>
    <variable id="u_gz1m7HbB%4B,d^3^wI">fetchOptions</variable>
    <variable id="qZU|)Z7e!djhy7^B:_F/">i</variable>
    <variable id="HfpC*l#[HT(Tbn-x8k28">result</variable>
  </variables>
  <block type="variables_set" id="=2NY}Uw!].hQYzvRV(mH" x="-187" y="13">
    <field name="VAR" id="m(W@npD`3A65xYwKnwcj">delay</field>
    <value name="VALUE">
      <block type="math_arithmetic" id="/DQ9vE:JwEl8e?Vso:yP">
        <field name="OP">ADD</field>
        <value name="A">
          <shadow type="math_number" id="*5rVJ$QDe:U,AFZ17!6A">
            <field name="NUM">1</field>
          </shadow>
          <block type="math_arithmetic" id="o0u2s2ev=HDa^%ql#gLX">
            <field name="OP">MULTIPLY</field>
            <value name="A">
              <shadow type="math_number" id="VW@y;YZ*ZNDd)$C,G{_|">
                <field name="NUM">24</field>
              </shadow>
            </value>
            <value name="B">
              <shadow type="math_number" id="TQqZk{D(:eBUPlmP+`ie">
                <field name="NUM">3600</field>
              </shadow>
            </value>
          </block>
        </value>
        <value name="B">
          <shadow type="math_number" id="z!~Q{K5Q0IkaBw+%5CW7">
            <field name="NUM">1000</field>
          </shadow>
        </value>
      </block>
    </value>
    <next>
      <block type="variables_set" id="}EsqO-eH_m-1aC~fYXc~">
        <field name="VAR" id="hcM*MvQp$7|~Sa0DZ!Ab">yesterday</field>
        <value name="VALUE">
          <block type="math_arithmetic" id="S7tGvoq^2%$HPbgjZc2F">
            <field name="OP">MINUS</field>
            <value name="A">
              <shadow type="math_number" id="]u}(uGe9xvT{`~Fz?DFk">
                <field name="NUM">1</field>
              </shadow>
              <block type="time_get" id="{Oh9nYW%lwA+X9:U0R7~">
                <mutation xmlns="http://www.w3.org/1999/xhtml" format="false" language="false"></mutation>
                <field name="OPTION">object</field>
              </block>
            </value>
            <value name="B">
              <shadow type="math_number" id="nbbdfsxIliB@{zhDU~@S">
                <field name="NUM">1</field>
              </shadow>
              <block type="variables_get" id="NX]g6Y~P~eko^kapF3AW">
                <field name="VAR" id="m(W@npD`3A65xYwKnwcj">delay</field>
              </block>
            </value>
          </block>
        </value>
        <next>
          <block type="variables_set" id=",8lFgiLv/t:}!Sov@6~i">
            <field name="VAR" id="GpMd@6@ZS_+%P5uFU6Xf">searchCriteria</field>
            <value name="VALUE">
              <block type="text_join" id="0g}O`Y[F{C.vZqoi(A*(">
                <mutation items="3"></mutation>
                <value name="ADD0">
                  <block type="text" id="(DM|}NN`uSQU3vr~zF*M">
                    <field name="TEXT">["UNSEEN", ["SINCE", "</field>
                  </block>
                </value>
                <value name="ADD1">
                  <block type="convert_from_date" id="SARFs[%|yh-Ye}muxLU/">
                    <mutation xmlns="http://www.w3.org/1999/xhtml" format="true" language="false"></mutation>
                    <field name="OPTION">custom</field>
                    <field name="FORMAT">JJJJ.MM.TT SS:mm:ss</field>
                    <value name="VALUE">
                      <block type="variables_get" id="4$/iulr^cuAf)YGuUG*1">
                        <field name="VAR" id="hcM*MvQp$7|~Sa0DZ!Ab">yesterday</field>
                      </block>
                    </value>
                  </block>
                </value>
                <value name="ADD2">
                  <block type="text" id="VYh/i3pe/7yO/(6yPy[X">
                    <field name="TEXT">"]]</field>
                  </block>
                </value>
              </block>
            </value>
            <next>
              <block type="variables_set" id="?!kgnGBp|Pxq]NM{e)$W">
                <field name="VAR" id="u_gz1m7HbB%4B,d^3^wI">fetchOptions</field>
                <value name="VALUE">
                  <block type="text" id="+Tk)wTju@S5:h[6v@^}d">
                    <field name="TEXT">{ "bodies": ["HEADER.FIELDS (FROM TO SUBJECT DATE)"], "struct": true }</field>
                  </block>
                </value>
                <next>
                  <block type="imap_request" id="%G80gzr6owuRhlzSE-F#">
                    <field name="INSTANCE">.0</field>
                    <field name="IMAPNAME">github@luckyskills.de</field>
                    <field name="MAILPARSER">TRUE</field>
                    <field name="LOG"></field>
                    <value name="SEARCH">
                      <shadow type="text" id="BQ3)vCa;~[ae~`-2vELP">
                        <field name="TEXT">["ALL", ["SINCE", "May 20, 2022"]]</field>
                      </shadow>
                      <block type="variables_get" id="m/AzN}2,.R~v5+?/GX@q">
                        <field name="VAR" id="GpMd@6@ZS_+%P5uFU6Xf">searchCriteria</field>
                      </block>
                    </value>
                    <value name="FETCH">
                      <shadow type="text" id="^54K#+9F1UWzjR(xSf`@">
                        <field name="TEXT">{"fetch": false, "seqno": [1,2,3,4]}</field>
                      </shadow>
                    </value>
                    <value name="BODIES">
                      <shadow type="text" id="PIH8FwXY8i:DqCmj(?Ky">
                        <field name="TEXT">{bodies: "", markSeen: false}</field>
                      </shadow>
                      <block type="variables_get" id="4.Hb;vHPMqcj#`[C,+qs">
                        <field name="VAR" id="u_gz1m7HbB%4B,d^3^wI">fetchOptions</field>
                      </block>
                    </value>
                    <value name="MAX">
                      <shadow type="math_number" id="W13`|!5Z@8~J/r2}*k]t">
                        <field name="NUM">20</field>
                      </shadow>
                    </value>
                    <statement name="STATEMENT">
                      <block type="controls_forEach" id="N{i!P||=v+J)(6s$@yKT">
                        <field name="VAR" id="qZU|)Z7e!djhy7^B:_F/">i</field>
                        <value name="LIST">
                          <block type="variables_get" id="uFg;h;k|JTblE*Vc8!uo">
                            <field name="VAR" id="HfpC*l#[HT(Tbn-x8k28">result</field>
                          </block>
                        </value>
                        <statement name="DO">
                          <block type="debug" id=",v{aDYIITQ;j$(-ik@,z">
                            <field name="Severity">log</field>
                            <value name="TEXT">
                              <shadow type="text" id="HJ}2e*t)OMhT[L]xgGB?">
                                <field name="TEXT">test</field>
                              </shadow>
                              <block type="variables_get" id="`~tiDni=kOxFJ8KF0M.-">
                                <field name="VAR" id="qZU|)Z7e!djhy7^B:_F/">i</field>
                              </block>
                            </value>
                          </block>
                        </statement>
                      </block>
                    </statement>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>
```

-   Load all emails from the last 24 hours from an IMAP connection:

```json
var delay = 24 * 3600 * 1000;
var yesterday;
yesterday = new Date();
yesterday.setTime(Date.now() - delay);
yesterday = yesterday.toISOString();
var searchCriteria = ['ALL', ['SINCE', yesterday]];
var fetchOptions = { bodies: "", struct: true };
sendTo("imap.0", "getIMAPRequest", {
  name: "github@luckyskills.de",
   max: 20,
   search: searchCriteria,
   fetch:  {"fetch": false, "uid": [1,2,3,4]},
   bodie: fetchOptions,
   parse: true,
}, async function (result) {
    console.log(JSON.stringify(result));
});
```

-   Completely load an email with a UID from an IMAP connection:

```json
sendTo("imap.0", "getIMAPRequest", {
  name: "github@luckyskills.de",
   max: 20,
   search: ['ALL'],
   fetch:  {"fetch": true, "uid": [267},
   bodie: { bodies: "", struct: true },
   parse: true,
}, async function (result) {
    console.log(JSON.stringify(result));
});
```

-   Save the attachments of an email from an IMAP connection. The UID is required:

```
var i, result, j, json;
sendTo(
    "imap.0",
    "getIMAPRequest",
    {
        name: "test@luckyskills.de",
        max: 20,
        search: '["ALL"]',
        fetch: JSON.parse('{"fetch": true, "uid": [21954]}'),
        bodie: '{bodies: "", markSeen: false}',
        parse: true,
    },
    async function (result) {
        if (!result) {
            console.log("No result found!");
            return;
        }
        for (var i_index in result) {
            i = result[i_index];
            var j_list = getAttr(i, "body.attachments");
            for (var j_index in j_list) {
                j = j_list[j_index];
                json = Buffer.from(getAttr(j, 'content'));
                // Your attachment as Buffer
                // console.log(getAttr(json, 'data'));
                console.log(getAttr(j, "filename"));
                writeFile("vis.0", getAttr(j, "filename"), json, function (error) {
                    if (error) {
                        console.log(
                            "Error saving file " + getAttr(json, "filename") + "   Error:" + error,
                            "warn",
                        );
                    } else {
                        console.log("File " + getAttr(j, "filename") + " was saved");
                        // Your Code
                        delFile("vis.0", getAttr(j, "filename"), function (error) {
                            if (!error) console.log("File " + getAttr(j, "filename") + " is deleted");
                        });
                    }
                });
            }
        }
    },
);
```

-   Find emails from a user and move them to a folder:

```
var i, result, s;
sendTo("imap.0", "getIMAPRequest", {
    name: "ppc@dbrp-mueller.de",
    max: 20,
    search: '["ALL", ["HEADER", "FROM", "github@luckyskills.de"]]',
    fetch:  JSON.parse('{"fetch": false, "seqno": [21954]}'),
    bodie: '{bodies: "", markSeen: false}',
    parse: true,
}, async function (result) {
    if (!result) {
        console.log("No result found!");
        return;
    }
    for (var i_index in result) {
        i = result[i_index];
        s = getAttr(i, "attrs.uid");
        setState("imap.0.xxx.remote.move.folder","INBOX/PRIVAT");
        setState("imap.0.xxx.remote.move.uid",s);
        setState("imap.0.xxx.remote.move.apply_move",true);
    }
});
```

-   Set flags:

```
sendTo("imap.0", "getFlags", {flag: 'setFlags', uid: 123, flagtype: 'Seen', name: 'github@luckyskills.de'});
```

-   Added flags:

```
sendTo("imap.0", "getFlags", {flag: 'addFlags', uid: 123, flagtype: 'Seen', name: 'github@luckyskills.de'});
```

-   Delete Flags:

```
sendTo("imap.0", "getFlags", {flag: 'delFlags', uid: 123, flagtype: 'Seen', name: 'github@luckyskills.de'});
```

-   Keywords - Possible if imap.0.xxx.status contains this - `"newKeywords": true,`

-   Set keywords:

```
sendTo("imap.0", "getFlags", {flag: 'setKeywords', uid: 123, flagtype: 'TEST', name: 'github@luckyskills.de'});
```

-   Added keywords:

```
sendTo("imap.0", "getFlags", {flag: 'addKeywords', uid: 123, flagtype: 'TEST', name: 'github@luckyskills.de'});
```

-   Delete keywords:

```
sendTo("imap.0", "getFlags", {flag: 'delKeywords', uid: 123, flagtype: 'TEST', name: 'github@luckyskills.de'});
```

[Return to description](/#/adapters/imap)