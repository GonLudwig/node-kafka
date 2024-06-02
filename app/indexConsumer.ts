import FraudDetector from "./services/FraudDetector";
import LogService from "./services/LogService";

const log: LogService = new LogService();
log.poll()

const fraud: FraudDetector = new FraudDetector();
fraud.poll()