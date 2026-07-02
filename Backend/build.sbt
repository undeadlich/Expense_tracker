name := "play-java-starter-example"

version := "1.0-SNAPSHOT"

lazy val root = (project in file("."))
  .enablePlugins(PlayJava, PlayEbean)

scalaVersion := "2.11.12"

libraryDependencies ++= Seq(
  evolutions,
  cache,
  javaJdbc,
  javaWs,

  "mysql" % "mysql-connector-java" % "5.1.49",
  "com.h2database" % "h2" % "1.4.196",
  "com.auth0" % "java-jwt" % "4.4.0",
  "org.assertj" % "assertj-core" % "3.6.2" % Test,
  "org.awaitility" % "awaitility" % "2.0.0" % Test
)
libraryDependencies += "org.mindrot" % "jbcrypt" % "0.4"
libraryDependencies += filters

testOptions in Test := Seq(
  Tests.Argument(TestFrameworks.JUnit, "-a", "-v")
)