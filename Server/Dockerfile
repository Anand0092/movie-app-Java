FROM openjdk:8-jdk-alpine
ADD target/Server-1.0.jar app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom", "-Dspring.profiles.active=container", "-jar","/app.jar"]
