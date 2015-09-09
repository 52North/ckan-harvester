#!/bin/sh

java -jar node_modules/jsonix/lib/jsonix-schema-compiler-full.jar -d mappings -p WMS130 xsd/wms/1.3.0/capabilities_1_3_0.xsd
java -jar node_modules/jsonix/lib/jsonix-schema-compiler-full.jar -d mappings -p WMS111 xsd/wms/1.1.1/capabilities_1_1_1.xsd
java -jar node_modules/jsonix/lib/jsonix-schema-compiler-full.jar -d mappings -p WMS110 xsd/wms/1.1.0/capabilities_1_1_0.xsd
