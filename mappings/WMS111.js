var WMS111_Module_Factory = function () {
  var WMS111 = {
    name: 'WMS111',
    typeInfos: [{
        localName: 'Request',
        typeName: null,
        propertyInfos: [{
            name: 'getCapabilities',
            elementName: {
              localPart: 'GetCapabilities'
            },
            typeInfo: '.GetCapabilities'
          }, {
            name: 'getMap',
            elementName: {
              localPart: 'GetMap'
            },
            typeInfo: '.GetMap'
          }, {
            name: 'getFeatureInfo',
            elementName: {
              localPart: 'GetFeatureInfo'
            },
            typeInfo: '.GetFeatureInfo'
          }, {
            name: 'describeLayer',
            elementName: {
              localPart: 'DescribeLayer'
            },
            typeInfo: '.DescribeLayer'
          }, {
            name: 'getLegendGraphic',
            elementName: {
              localPart: 'GetLegendGraphic'
            },
            typeInfo: '.GetLegendGraphic'
          }, {
            name: 'getStyles',
            elementName: {
              localPart: 'GetStyles'
            },
            typeInfo: '.GetStyles'
          }, {
            name: 'putStyles',
            elementName: {
              localPart: 'PutStyles'
            },
            typeInfo: '.PutStyles'
          }]
      }, {
        localName: 'Get',
        typeName: null,
        propertyInfos: [{
            name: 'onlineResource',
            elementName: {
              localPart: 'OnlineResource'
            },
            typeInfo: '.OnlineResource'
          }]
      }, {
        localName: 'Post',
        typeName: null,
        propertyInfos: [{
            name: 'onlineResource',
            elementName: {
              localPart: 'OnlineResource'
            },
            typeInfo: '.OnlineResource'
          }]
      }, {
        localName: 'LatLonBoundingBox',
        typeName: null,
        propertyInfos: [{
            name: 'minx',
            attributeName: {
              localPart: 'minx'
            },
            type: 'attribute'
          }, {
            name: 'miny',
            attributeName: {
              localPart: 'miny'
            },
            type: 'attribute'
          }, {
            name: 'maxx',
            attributeName: {
              localPart: 'maxx'
            },
            type: 'attribute'
          }, {
            name: 'maxy',
            attributeName: {
              localPart: 'maxy'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'Dimension',
        typeName: null,
        propertyInfos: [{
            name: 'name',
            attributeName: {
              localPart: 'name'
            },
            type: 'attribute'
          }, {
            name: 'units',
            attributeName: {
              localPart: 'units'
            },
            type: 'attribute'
          }, {
            name: 'unitSymbol',
            attributeName: {
              localPart: 'unitSymbol'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DescribeLayer',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            collection: true,
            elementName: {
              localPart: 'Format'
            }
          }, {
            name: 'dcpType',
            collection: true,
            elementName: {
              localPart: 'DCPType'
            },
            typeInfo: '.HTTP'
          }]
      }, {
        localName: 'GetStyles',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            collection: true,
            elementName: {
              localPart: 'Format'
            }
          }, {
            name: 'dcpType',
            collection: true,
            elementName: {
              localPart: 'DCPType'
            },
            typeInfo: '.HTTP'
          }]
      }, {
        localName: 'Attribution',
        typeName: null,
        propertyInfos: [{
            name: 'title',
            elementName: {
              localPart: 'Title'
            }
          }, {
            name: 'onlineResource',
            elementName: {
              localPart: 'OnlineResource'
            },
            typeInfo: '.OnlineResource'
          }, {
            name: 'logoURL',
            elementName: {
              localPart: 'LogoURL'
            },
            typeInfo: '.LogoURL'
          }]
      }, {
        localName: 'WMTMSCapabilities',
        typeName: null,
        propertyInfos: [{
            name: 'service',
            elementName: {
              localPart: 'Service'
            },
            typeInfo: '.Service'
          }, {
            name: 'capability',
            elementName: {
              localPart: 'Capability'
            },
            typeInfo: '.Capability'
          }, {
            name: 'version',
            attributeName: {
              localPart: 'version'
            },
            type: 'attribute'
          }, {
            name: 'updateSequence',
            attributeName: {
              localPart: 'updateSequence'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'LegendURL',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            elementName: {
              localPart: 'Format'
            }
          }, {
            name: 'onlineResource',
            elementName: {
              localPart: 'OnlineResource'
            },
            typeInfo: '.OnlineResource'
          }, {
            name: 'width',
            attributeName: {
              localPart: 'width'
            },
            type: 'attribute'
          }, {
            name: 'height',
            attributeName: {
              localPart: 'height'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'FeatureListURL',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            elementName: {
              localPart: 'Format'
            }
          }, {
            name: 'onlineResource',
            elementName: {
              localPart: 'OnlineResource'
            },
            typeInfo: '.OnlineResource'
          }]
      }, {
        localName: 'ContactAddress',
        typeName: null,
        propertyInfos: [{
            name: 'addressType',
            elementName: {
              localPart: 'AddressType'
            }
          }, {
            name: 'address',
            elementName: {
              localPart: 'Address'
            }
          }, {
            name: 'city',
            elementName: {
              localPart: 'City'
            }
          }, {
            name: 'stateOrProvince',
            elementName: {
              localPart: 'StateOrProvince'
            }
          }, {
            name: 'postCode',
            elementName: {
              localPart: 'PostCode'
            }
          }, {
            name: 'country',
            elementName: {
              localPart: 'Country'
            }
          }]
      }, {
        localName: 'GetLegendGraphic',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            collection: true,
            elementName: {
              localPart: 'Format'
            }
          }, {
            name: 'dcpType',
            collection: true,
            elementName: {
              localPart: 'DCPType'
            },
            typeInfo: '.HTTP'
          }]
      }, {
        localName: 'GetCapabilities',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            collection: true,
            elementName: {
              localPart: 'Format'
            }
          }, {
            name: 'dcpType',
            collection: true,
            elementName: {
              localPart: 'DCPType'
            },
            typeInfo: '.HTTP'
          }]
      }, {
        localName: 'Extent',
        typeName: null,
        propertyInfos: [{
            name: 'content',
            type: 'value'
          }, {
            name: 'name',
            attributeName: {
              localPart: 'name'
            },
            type: 'attribute'
          }, {
            name: '_default',
            attributeName: {
              localPart: 'default'
            },
            type: 'attribute'
          }, {
            name: 'nearestValue',
            attributeName: {
              localPart: 'nearestValue'
            },
            type: 'attribute'
          }, {
            name: 'multipleValues',
            attributeName: {
              localPart: 'multipleValues'
            },
            type: 'attribute'
          }, {
            name: 'current',
            attributeName: {
              localPart: 'current'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'KeywordList',
        typeName: null,
        propertyInfos: [{
            name: 'keyword',
            collection: true,
            elementName: {
              localPart: 'Keyword'
            }
          }]
      }, {
        localName: 'StyleSheetURL',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            elementName: {
              localPart: 'Format'
            }
          }, {
            name: 'onlineResource',
            elementName: {
              localPart: 'OnlineResource'
            },
            typeInfo: '.OnlineResource'
          }]
      }, {
        localName: 'DataURL',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            elementName: {
              localPart: 'Format'
            }
          }, {
            name: 'onlineResource',
            elementName: {
              localPart: 'OnlineResource'
            },
            typeInfo: '.OnlineResource'
          }]
      }, {
        localName: 'UserDefinedSymbolization',
        typeName: null,
        propertyInfos: [{
            name: 'supportSLD',
            attributeName: {
              localPart: 'SupportSLD'
            },
            type: 'attribute'
          }, {
            name: 'userLayer',
            attributeName: {
              localPart: 'UserLayer'
            },
            type: 'attribute'
          }, {
            name: 'userStyle',
            attributeName: {
              localPart: 'UserStyle'
            },
            type: 'attribute'
          }, {
            name: 'remoteWFS',
            attributeName: {
              localPart: 'RemoteWFS'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MetadataURL',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            elementName: {
              localPart: 'Format'
            }
          }, {
            name: 'onlineResource',
            elementName: {
              localPart: 'OnlineResource'
            },
            typeInfo: '.OnlineResource'
          }, {
            name: 'type',
            attributeName: {
              localPart: 'type'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'AuthorityURL',
        typeName: null,
        propertyInfos: [{
            name: 'onlineResource',
            elementName: {
              localPart: 'OnlineResource'
            },
            typeInfo: '.OnlineResource'
          }, {
            name: 'name',
            attributeName: {
              localPart: 'name'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PutStyles',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            collection: true,
            elementName: {
              localPart: 'Format'
            }
          }, {
            name: 'dcpType',
            collection: true,
            elementName: {
              localPart: 'DCPType'
            },
            typeInfo: '.HTTP'
          }]
      }, {
        localName: 'ScaleHint',
        typeName: null,
        propertyInfos: [{
            name: 'min',
            attributeName: {
              localPart: 'min'
            },
            type: 'attribute'
          }, {
            name: 'max',
            attributeName: {
              localPart: 'max'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'Identifier',
        typeName: null,
        propertyInfos: [{
            name: 'content',
            type: 'value'
          }, {
            name: 'authority',
            attributeName: {
              localPart: 'authority'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ContactPersonPrimary',
        typeName: null,
        propertyInfos: [{
            name: 'contactPerson',
            elementName: {
              localPart: 'ContactPerson'
            }
          }, {
            name: 'contactOrganization',
            elementName: {
              localPart: 'ContactOrganization'
            }
          }]
      }, {
        localName: 'GetMap',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            collection: true,
            elementName: {
              localPart: 'Format'
            }
          }, {
            name: 'dcpType',
            collection: true,
            elementName: {
              localPart: 'DCPType'
            },
            typeInfo: '.HTTP'
          }]
      }, {
        localName: 'OnlineResource',
        typeName: null,
        propertyInfos: [{
            name: 'type',
            attributeName: {
              localPart: 'type',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'href',
            attributeName: {
              localPart: 'href',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'HTTP',
        propertyInfos: [{
            name: 'http',
            elementName: {
              localPart: 'HTTP'
            },
            typeInfo: '.HTTP'
          }]
      }, {
        localName: 'GetFeatureInfo',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            collection: true,
            elementName: {
              localPart: 'Format'
            }
          }, {
            name: 'dcpType',
            collection: true,
            elementName: {
              localPart: 'DCPType'
            },
            typeInfo: '.HTTP'
          }]
      }, {
        localName: 'BoundingBox',
        typeName: null,
        propertyInfos: [{
            name: 'srs',
            attributeName: {
              localPart: 'SRS'
            },
            type: 'attribute'
          }, {
            name: 'minx',
            attributeName: {
              localPart: 'minx'
            },
            type: 'attribute'
          }, {
            name: 'miny',
            attributeName: {
              localPart: 'miny'
            },
            type: 'attribute'
          }, {
            name: 'maxx',
            attributeName: {
              localPart: 'maxx'
            },
            type: 'attribute'
          }, {
            name: 'maxy',
            attributeName: {
              localPart: 'maxy'
            },
            type: 'attribute'
          }, {
            name: 'resx',
            attributeName: {
              localPart: 'resx'
            },
            type: 'attribute'
          }, {
            name: 'resy',
            attributeName: {
              localPart: 'resy'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'Layer',
        typeName: null,
        propertyInfos: [{
            name: 'name',
            elementName: {
              localPart: 'Name'
            }
          }, {
            name: 'title',
            elementName: {
              localPart: 'Title'
            }
          }, {
            name: '_abstract',
            elementName: {
              localPart: 'Abstract'
            }
          }, {
            name: 'keywordList',
            elementName: {
              localPart: 'KeywordList'
            },
            typeInfo: '.KeywordList'
          }, {
            name: 'srs',
            collection: true,
            elementName: {
              localPart: 'SRS'
            }
          }, {
            name: 'latLonBoundingBox',
            elementName: {
              localPart: 'LatLonBoundingBox'
            },
            typeInfo: '.LatLonBoundingBox'
          }, {
            name: 'boundingBox',
            collection: true,
            elementName: {
              localPart: 'BoundingBox'
            },
            typeInfo: '.BoundingBox'
          }, {
            name: 'dimension',
            collection: true,
            elementName: {
              localPart: 'Dimension'
            },
            typeInfo: '.Dimension'
          }, {
            name: 'extent',
            collection: true,
            elementName: {
              localPart: 'Extent'
            },
            typeInfo: '.Extent'
          }, {
            name: 'attribution',
            elementName: {
              localPart: 'Attribution'
            },
            typeInfo: '.Attribution'
          }, {
            name: 'authorityURL',
            collection: true,
            elementName: {
              localPart: 'AuthorityURL'
            },
            typeInfo: '.AuthorityURL'
          }, {
            name: 'identifier',
            collection: true,
            elementName: {
              localPart: 'Identifier'
            },
            typeInfo: '.Identifier'
          }, {
            name: 'metadataURL',
            collection: true,
            elementName: {
              localPart: 'MetadataURL'
            },
            typeInfo: '.MetadataURL'
          }, {
            name: 'dataURL',
            collection: true,
            elementName: {
              localPart: 'DataURL'
            },
            typeInfo: '.DataURL'
          }, {
            name: 'featureListURL',
            collection: true,
            elementName: {
              localPart: 'FeatureListURL'
            },
            typeInfo: '.FeatureListURL'
          }, {
            name: 'style',
            collection: true,
            elementName: {
              localPart: 'Style'
            },
            typeInfo: '.Style'
          }, {
            name: 'scaleHint',
            elementName: {
              localPart: 'ScaleHint'
            },
            typeInfo: '.ScaleHint'
          }, {
            name: 'layer',
            collection: true,
            elementName: {
              localPart: 'Layer'
            },
            typeInfo: '.Layer'
          }, {
            name: 'queryable',
            attributeName: {
              localPart: 'queryable'
            },
            type: 'attribute'
          }, {
            name: 'cascaded',
            attributeName: {
              localPart: 'cascaded'
            },
            type: 'attribute'
          }, {
            name: 'opaque',
            attributeName: {
              localPart: 'opaque'
            },
            type: 'attribute'
          }, {
            name: 'noSubsets',
            attributeName: {
              localPart: 'noSubsets'
            },
            type: 'attribute'
          }, {
            name: 'fixedWidth',
            attributeName: {
              localPart: 'fixedWidth'
            },
            type: 'attribute'
          }, {
            name: 'fixedHeight',
            attributeName: {
              localPart: 'fixedHeight'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'Exception',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            collection: true,
            elementName: {
              localPart: 'Format'
            }
          }]
      }, {
        localName: 'HTTP',
        typeName: null,
        propertyInfos: [{
            name: 'getOrPost',
            collection: true,
            elementTypeInfos: [{
                elementName: {
                  localPart: 'Get'
                },
                typeInfo: '.Get'
              }, {
                elementName: {
                  localPart: 'Post'
                },
                typeInfo: '.Post'
              }],
            type: 'elements'
          }]
      }, {
        localName: 'LogoURL',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            elementName: {
              localPart: 'Format'
            }
          }, {
            name: 'onlineResource',
            elementName: {
              localPart: 'OnlineResource'
            },
            typeInfo: '.OnlineResource'
          }, {
            name: 'width',
            attributeName: {
              localPart: 'width'
            },
            type: 'attribute'
          }, {
            name: 'height',
            attributeName: {
              localPart: 'height'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'Capability',
        typeName: null,
        propertyInfos: [{
            name: 'request',
            elementName: {
              localPart: 'Request'
            },
            typeInfo: '.Request'
          }, {
            name: 'exception',
            elementName: {
              localPart: 'Exception'
            },
            typeInfo: '.Exception'
          }, {
            name: 'userDefinedSymbolization',
            elementName: {
              localPart: 'UserDefinedSymbolization'
            },
            typeInfo: '.UserDefinedSymbolization'
          }, {
            name: 'layer',
            elementName: {
              localPart: 'Layer'
            },
            typeInfo: '.Layer'
          }]
      }, {
        localName: 'ContactInformation',
        typeName: null,
        propertyInfos: [{
            name: 'contactPersonPrimary',
            elementName: {
              localPart: 'ContactPersonPrimary'
            },
            typeInfo: '.ContactPersonPrimary'
          }, {
            name: 'contactPosition',
            elementName: {
              localPart: 'ContactPosition'
            }
          }, {
            name: 'contactAddress',
            elementName: {
              localPart: 'ContactAddress'
            },
            typeInfo: '.ContactAddress'
          }, {
            name: 'contactVoiceTelephone',
            elementName: {
              localPart: 'ContactVoiceTelephone'
            }
          }, {
            name: 'contactFacsimileTelephone',
            elementName: {
              localPart: 'ContactFacsimileTelephone'
            }
          }, {
            name: 'contactElectronicMailAddress',
            elementName: {
              localPart: 'ContactElectronicMailAddress'
            }
          }]
      }, {
        localName: 'StyleURL',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            elementName: {
              localPart: 'Format'
            }
          }, {
            name: 'onlineResource',
            elementName: {
              localPart: 'OnlineResource'
            },
            typeInfo: '.OnlineResource'
          }]
      }, {
        localName: 'Style',
        typeName: null,
        propertyInfos: [{
            name: 'name',
            elementName: {
              localPart: 'Name'
            }
          }, {
            name: 'title',
            elementName: {
              localPart: 'Title'
            }
          }, {
            name: '_abstract',
            elementName: {
              localPart: 'Abstract'
            }
          }, {
            name: 'legendURL',
            collection: true,
            elementName: {
              localPart: 'LegendURL'
            },
            typeInfo: '.LegendURL'
          }, {
            name: 'styleSheetURL',
            elementName: {
              localPart: 'StyleSheetURL'
            },
            typeInfo: '.StyleSheetURL'
          }, {
            name: 'styleURL',
            elementName: {
              localPart: 'StyleURL'
            },
            typeInfo: '.StyleURL'
          }]
      }, {
        localName: 'Service',
        typeName: null,
        propertyInfos: [{
            name: 'name',
            elementName: {
              localPart: 'Name'
            }
          }, {
            name: 'title',
            elementName: {
              localPart: 'Title'
            }
          }, {
            name: '_abstract',
            elementName: {
              localPart: 'Abstract'
            }
          }, {
            name: 'keywordList',
            elementName: {
              localPart: 'KeywordList'
            },
            typeInfo: '.KeywordList'
          }, {
            name: 'onlineResource',
            elementName: {
              localPart: 'OnlineResource'
            },
            typeInfo: '.OnlineResource'
          }, {
            name: 'contactInformation',
            elementName: {
              localPart: 'ContactInformation'
            },
            typeInfo: '.ContactInformation'
          }, {
            name: 'fees',
            elementName: {
              localPart: 'Fees'
            }
          }, {
            name: 'accessConstraints',
            elementName: {
              localPart: 'AccessConstraints'
            }
          }]
      }],
    elementInfos: [{
        elementName: {
          localPart: 'Request'
        },
        typeInfo: '.Request'
      }, {
        elementName: {
          localPart: 'BoundingBox'
        },
        typeInfo: '.BoundingBox'
      }, {
        elementName: {
          localPart: 'FeatureListURL'
        },
        typeInfo: '.FeatureListURL'
      }, {
        elementName: {
          localPart: 'AccessConstraints'
        }
      }, {
        elementName: {
          localPart: 'Layer'
        },
        typeInfo: '.Layer'
      }, {
        elementName: {
          localPart: 'Country'
        }
      }, {
        elementName: {
          localPart: 'Name'
        }
      }, {
        elementName: {
          localPart: 'ContactPerson'
        }
      }, {
        elementName: {
          localPart: 'AddressType'
        }
      }, {
        elementName: {
          localPart: 'Capability'
        },
        typeInfo: '.Capability'
      }, {
        elementName: {
          localPart: 'Keyword'
        }
      }, {
        elementName: {
          localPart: 'ContactPosition'
        }
      }, {
        elementName: {
          localPart: 'GetStyles'
        },
        typeInfo: '.GetStyles'
      }, {
        elementName: {
          localPart: 'ScaleHint'
        },
        typeInfo: '.ScaleHint'
      }, {
        elementName: {
          localPart: 'Fees'
        }
      }, {
        elementName: {
          localPart: 'GetFeatureInfo'
        },
        typeInfo: '.GetFeatureInfo'
      }, {
        elementName: {
          localPart: 'Service'
        },
        typeInfo: '.Service'
      }, {
        elementName: {
          localPart: 'Post'
        },
        typeInfo: '.Post'
      }, {
        elementName: {
          localPart: 'Exception'
        },
        typeInfo: '.Exception'
      }, {
        elementName: {
          localPart: 'GetCapabilities'
        },
        typeInfo: '.GetCapabilities'
      }, {
        elementName: {
          localPart: 'StyleSheetURL'
        },
        typeInfo: '.StyleSheetURL'
      }, {
        elementName: {
          localPart: 'HTTP'
        },
        typeInfo: '.HTTP'
      }, {
        elementName: {
          localPart: 'AuthorityURL'
        },
        typeInfo: '.AuthorityURL'
      }, {
        elementName: {
          localPart: 'SRS'
        }
      }, {
        elementName: {
          localPart: 'ContactVoiceTelephone'
        }
      }, {
        elementName: {
          localPart: 'WMT_MS_Capabilities'
        },
        typeInfo: '.WMTMSCapabilities'
      }, {
        elementName: {
          localPart: 'DataURL'
        },
        typeInfo: '.DataURL'
      }, {
        elementName: {
          localPart: 'Address'
        }
      }, {
        elementName: {
          localPart: 'GetMap'
        },
        typeInfo: '.GetMap'
      }, {
        elementName: {
          localPart: 'Identifier'
        },
        typeInfo: '.Identifier'
      }, {
        elementName: {
          localPart: 'PutStyles'
        },
        typeInfo: '.PutStyles'
      }, {
        elementName: {
          localPart: 'ContactFacsimileTelephone'
        }
      }, {
        elementName: {
          localPart: 'LegendURL'
        },
        typeInfo: '.LegendURL'
      }, {
        elementName: {
          localPart: 'Abstract'
        }
      }, {
        elementName: {
          localPart: 'MetadataURL'
        },
        typeInfo: '.MetadataURL'
      }, {
        elementName: {
          localPart: 'Format'
        }
      }, {
        elementName: {
          localPart: 'ContactAddress'
        },
        typeInfo: '.ContactAddress'
      }, {
        elementName: {
          localPart: 'LatLonBoundingBox'
        },
        typeInfo: '.LatLonBoundingBox'
      }, {
        elementName: {
          localPart: 'StateOrProvince'
        }
      }, {
        elementName: {
          localPart: 'Attribution'
        },
        typeInfo: '.Attribution'
      }, {
        elementName: {
          localPart: 'Title'
        }
      }, {
        elementName: {
          localPart: 'KeywordList'
        },
        typeInfo: '.KeywordList'
      }, {
        elementName: {
          localPart: 'DCPType'
        },
        typeInfo: '.HTTP'
      }, {
        elementName: {
          localPart: 'Dimension'
        },
        typeInfo: '.Dimension'
      }, {
        elementName: {
          localPart: 'Extent'
        },
        typeInfo: '.Extent'
      }, {
        elementName: {
          localPart: 'UserDefinedSymbolization'
        },
        typeInfo: '.UserDefinedSymbolization'
      }, {
        elementName: {
          localPart: 'Get'
        },
        typeInfo: '.Get'
      }, {
        elementName: {
          localPart: 'ContactOrganization'
        }
      }, {
        elementName: {
          localPart: 'City'
        }
      }, {
        elementName: {
          localPart: 'OnlineResource'
        },
        typeInfo: '.OnlineResource'
      }, {
        elementName: {
          localPart: 'ContactPersonPrimary'
        },
        typeInfo: '.ContactPersonPrimary'
      }, {
        elementName: {
          localPart: 'DescribeLayer'
        },
        typeInfo: '.DescribeLayer'
      }, {
        elementName: {
          localPart: 'GetLegendGraphic'
        },
        typeInfo: '.GetLegendGraphic'
      }, {
        elementName: {
          localPart: 'Style'
        },
        typeInfo: '.Style'
      }, {
        elementName: {
          localPart: 'LogoURL'
        },
        typeInfo: '.LogoURL'
      }, {
        elementName: {
          localPart: 'ContactElectronicMailAddress'
        }
      }, {
        elementName: {
          localPart: 'StyleURL'
        },
        typeInfo: '.StyleURL'
      }, {
        elementName: {
          localPart: 'PostCode'
        }
      }, {
        elementName: {
          localPart: 'ContactInformation'
        },
        typeInfo: '.ContactInformation'
      }]
  };
  return {
    WMS111: WMS111
  };
};
if (typeof define === 'function' && define.amd) {
  define([], WMS111_Module_Factory);
}
else {
  var WMS111_Module = WMS111_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.WMS111 = WMS111_Module.WMS111;
  }
  else {
    var WMS111 = WMS111_Module.WMS111;
  }
}