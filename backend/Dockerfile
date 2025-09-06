FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
COPY pom.xml mvnw* ./
COPY .mvn .mvn
RUN ./mvnw -q -ntp -DskipTests=true dependency:go-offline
COPY src ./src
RUN ./mvnw -q -ntp -DskipTests package
EXPOSE 8080
CMD ["java","-jar","target/health-tracker-backend-0.0.1-SNAPSHOT.jar"]
